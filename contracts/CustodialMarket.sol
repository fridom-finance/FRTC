// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";

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

    event TokenPurchaseRequested(address indexed from, uint256 value);
    event DepositsCollected(uint256 totalValue);
    event TokenMinted(uint256 entryPrice);

    event TokenSaleRequested(address indexed from, uint256 value);
    event LiquidationsPrepared(uint256 totalValue);
    event TokensLiquidated(uint256 exitPrice);

    /* Functions */

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

    function mintPendingInvestments(uint256 _tokenEntryPrice)
        external
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyInvestmentState(InvestmentStates.PendingInvestment)
    {}

    function sell(uint256 _amountToSell) external virtual {}

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

    function liquidate(uint256 _exitPrice)
        external
        payable
        virtual
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyLiquidationState(LiquidationStates.PendingLiquidation)
    {}

    function withdraw() external {
        uint256 amount = investors[msg.sender].pendingWithdrawals;
        investors[msg.sender].pendingWithdrawals = 0;
        payable(msg.sender).transfer(amount);
    }

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
