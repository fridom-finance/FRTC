// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 *  @title CustodialMarket
 *  This contract is a custodial market completely managed by the DEFAULT_ADMIN_ROLE, token
 *  is purchased and sold in this contract.
 *  It is designed to descentralize and facilitate investments done to off-chain assets
 *  represented by the token traded in this smart contract.
 *  Keeps track of the life cycle of the investor's investment.
 *  Keeps track of global states like the investment and liquidation states.
 *  Manages deposits and withdrawals in a batch like manner.
 */
contract CustodialMarket is AccessControl {
    /* Enums */

    enum InvestmentStates {
        PendingCollection,
        PendingInvestment
    }

    enum LiquidationStates {
        PendingPreparation,
        PendingLiquidation
    }

    /* Structs */

    struct Investor {
        uint256 deposits; // Purchases pending for collection
        uint256 pendingInvestments; // Collected deposits
        uint256 tokensToSell; // Sales pending for liquidation consideration
        uint256 pendingLiquidations; // Token units being liquidated
        uint256 pendingWithdrawals; // Pending for withdrawal
    }

    /* Storage */

    // Global state
    InvestmentStates public investmentState = InvestmentStates.PendingCollection; // Investments global state
    LiquidationStates public liquidationState = LiquidationStates.PendingPreparation; // Liquidations global state

    // Owners
    address public feeOwner; // Address receiving fund and primary market fees
    address public depositAddress; // Address handling all the deposits

    // Market spread
    uint256 public marketSpread; // divide by 10⁶ to get raw quantity

    // Investors area
    mapping(address => Investor) public investors; // Address to their investor info
    address[] internal investorsWithDeposits; // Investors having deposits pending for their collection
    address[] internal investorsWithPendingInvestments; // Investors having deposits pending for their investment
    address[] internal investorsWithTokensToSell; // Investors having tokens to sell
    address[] internal investorsWithPendingLiquidations; // Investors having pending liquidations

    // others
    uint256 public tokenPrice; // Token price in terms of Matic, has 18 decimals
    uint256 public minDeposit; // Minimum Matic required to purchase the token
    uint256 public minWithdrawal; // Minimum amount of token required to sell
    uint256 public totalAmountToLiquidate; // Total amount pending for liquidation

    /* Modifiers */

    modifier onlyInvestmentState(InvestmentStates targetInvState) {
        require(investmentState == targetInvState, "invalid investment state");
        _;
    }

    modifier onlyLiquidationState(LiquidationStates targetLiqState) {
        require(liquidationState == targetLiqState, "invalid liquidation state");
        _;
    }

    /* Events */

    /**
     *  @dev Emitted when the buy function is called
     *  @param _from Address that made the deposit
     *  @param _value Native token amount that was deposited
     */
    event TokenPurchaseRequested(address indexed _from, uint256 _value);
    /**
     *  @dev Emitted when the deposits are collected and sent to the deposit address
     *  @param _totalValue Native token amount collected
     */
    event DepositsCollected(uint256 _totalValue);
    /**
     *  @dev Emitted when token is minted to investors
     *  @param _entryPrice Price of token in terms of native token at which the token
     *  is minted
     */
    event TokenMinted(uint256 _entryPrice);

    /**
     *  @dev Emitted when token is sold
     *  @param _from Address that made the withdrawal request
     *  @param _value Token amount to liquidate
     */
    event TokenSaleRequested(address indexed _from, uint256 _value);
    /**
     *  @dev Emitted when the prepareLiquidations function is called, and
     *  tokens are locked for their future burn
     *  @param _totalValue Total amount of token to be liquidated
     */
    event LiquidationsPrepared(uint256 _totalValue);
    /**
     *  @dev Emitted when off-chain assets are liquidated and tokens are burned
     *  @param _exitPrice Price of token in terms of native token at which the token
     *  is burned
     */
    event TokensLiquidated(uint256 _exitPrice);

    /* Functions */

    /**
     *  @dev Deposits native token to buy token
     */
    function buy() public payable {
        require(msg.value >= minDeposit, "Not enough deposit");
        uint256 fee = (msg.value * marketSpread) / 2000000;
        if (investors[msg.sender].deposits == 0) {
            investorsWithDeposits.push(msg.sender);
        }
        investors[msg.sender].deposits += msg.value - fee;
        investors[feeOwner].pendingWithdrawals += fee;
        emit TokenPurchaseRequested(msg.sender, msg.value);
    }

    /**
     *  @dev Collects native token and is transfered to the deposit address.
     */
    function collectDeposits()
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyInvestmentState(InvestmentStates.PendingCollection)
    {
        uint256 totalDeposits = 0;
        for (uint256 i = investorsWithDeposits.length; i > 0; i--) {
            address iwd = investorsWithDeposits[i - 1];
            totalDeposits += investors[iwd].deposits;
            investors[iwd].pendingInvestments += investors[iwd].deposits;
            investorsWithPendingInvestments.push(iwd);
            investors[iwd].deposits = 0;
            investorsWithDeposits.pop();
        }
        investmentState = InvestmentStates.PendingInvestment;
        payable(depositAddress).transfer(totalDeposits);
        emit DepositsCollected(totalDeposits);
    }

    /**
     *  @dev Mints token according to pending investments
     *  @param _tokenEntryPrice Price of token in terms of native token at which the token
     *  is minted
     */
    function mintPendingInvestments(uint256 _tokenEntryPrice)
        external
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyInvestmentState(InvestmentStates.PendingInvestment)
    {}

    /**
     *  @dev Token is sent to this contract for their future burn
     *  @param _amountToSell Amount of token sent to this contract
     */
    function sell(uint256 _amountToSell) external virtual {}

    /**
     *  @dev Tokens sold to this contract, are locked for their future burn and liquidation
     *  of the assets they represent
     */
    function prepareLiquidations()
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyLiquidationState(LiquidationStates.PendingPreparation)
    {
        uint256 tatl = 0;
        for (uint256 i = investorsWithTokensToSell.length; i > 0; i--) {
            address iwtts = investorsWithTokensToSell[i - 1];
            tatl += investors[iwtts].tokensToSell;
            investors[iwtts].pendingLiquidations += investors[iwtts].tokensToSell;
            investorsWithPendingLiquidations.push(iwtts);
            investors[iwtts].tokensToSell = 0;
            investorsWithTokensToSell.pop();
        }
        liquidationState = LiquidationStates.PendingLiquidation;
        totalAmountToLiquidate = tatl;
        emit LiquidationsPrepared(totalAmountToLiquidate);
    }

    /**
     *  @dev Token locked is burned
     *  @param _tokenExitPrice Price of token in terms of native token at which the token
     *  is burned
     */
    function liquidate(uint256 _tokenExitPrice)
        external
        payable
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyLiquidationState(LiquidationStates.PendingLiquidation)
    {}

    /**
     *  @dev Withdraws native token after liquidation
     */
    function withdraw() external {
        uint256 amount = investors[msg.sender].pendingWithdrawals;
        investors[msg.sender].pendingWithdrawals = 0;
        payable(msg.sender).transfer(amount);
    }

    /**
     *  @dev Returns the number of investors in each of the investment stages (with deposits,
     *  pendingInvestments, tokensToSell, pendingLiquidations)
     *  @return (uint256,uint256,uint256,uint256)
     *  1 - Number of investors with deposits
     *  2 - Number of investors with pending investments
     *  3 - Number of investors with tokens to sell
     *  4 - Number of investors with pending liquidations
     */
    function getInvestorsState()
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            investorsWithDeposits.length,
            investorsWithPendingInvestments.length,
            investorsWithTokensToSell.length,
            investorsWithPendingLiquidations.length
        );
    }

    // Updates

    function setDepositAddress(address _depositAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        depositAddress = _depositAddress;
    }

    function setFeeOwner(address _feeOwner) external onlyRole(DEFAULT_ADMIN_ROLE) {
        feeOwner = _feeOwner;
    }

    function setMinDeposit(uint256 _minDeposit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minDeposit = _minDeposit;
    }

    function setMinWithdrawal(uint256 _minWithdrawal) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minWithdrawal = _minWithdrawal;
    }

    function setMarketSpread(uint256 _marketSpread) external onlyRole(DEFAULT_ADMIN_ROLE) {
        marketSpread = _marketSpread;
    }

    // Receive
    receive() external payable {
        buy();
    }
}
