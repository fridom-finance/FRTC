// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FRTC is ERC20, AccessControl {
    /* Enums */
    enum InvestmentsState {
        PendingCollection,
        PendingInvestment
    }

    enum LiquidationsState {
        PendingPreparation,
        PendingLiquidation
    }

    /* Structs */

    struct Investor {
        uint256 deposits; // Purchases pending for collection
        uint256 pendingInvestments; // Collected deposits
        uint256 tokenToSell; // Sales pending for liquidation consideration
        uint256 pendingLiquidations; // Token units being liquidated
        uint256 pendingWithdrawals; // Pending for withdrawal
    }

    struct Holder {
        uint256 lastFeeCharge; // timestamp of last time the management fee was charged
        bool isFreeOfFees; // Does the holder have to pay fees?
    }

    /* Storage */

    // Global state
    InvestmentsState public investmentsState = InvestmentsState.PendingCollection; // Investments global state
    LiquidationsState public liquidationsState = LiquidationsState.PendingPreparation; // Liquidations global state

    // Owners
    address public feeOwner; // Address receiving fund and primary market fees
    address public depositAddress; // Address handling all the deposits

    // Fund fees
    uint256 public managementFeePerSecond; // Divide by 10¹⁴ to get raw managementFeePerSecond
    // Other Fees, divide by 10⁶ to get raw quantity
    uint256 public performanceFee;
    uint256 public hurdleRate;
    uint256 public marketSpread;

    // Investors area
    mapping(address => Investor) private investors; // Address to their investor info
    address[] private investorsWithDeposits; // Investors having deposits pending for their collection
    address[] private investorsWithPendingInvestments; // Investors having deposits pending for their investment

    // Holders area
    mapping(address => Holder) private holders; // Address to their holder info

    // others
    uint256 public tokenPrice; // Token price in terms of Matic, has 18 decimals
    uint256 public minDeposit; // Minimum Matic required to purchase the token
    uint256 public minWithdrawal; // Minimum amount of token required to sell

    /* Events */

    event TokenPurchaseRequested(address indexed from, uint256 value);
    event DepositsCollected(uint256 totalValue);
    event TokenMinted();

    /* Constructor */

    constructor(
        address _defaultAdmin,
        address _feeOwner,
        address _depositAddress,
        uint256 _managementFeePerSecond,
        uint256 _performanceFee,
        uint256 _hurdleRate,
        uint256 _marketSpread,
        uint256 _minDeposit
    ) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        feeOwner = _feeOwner;
        depositAddress = _depositAddress;
        managementFeePerSecond = _managementFeePerSecond;
        performanceFee = _performanceFee;
        hurdleRate = _hurdleRate;
        marketSpread = _marketSpread;
        minDeposit = _minDeposit;

        holders[address(0)].isFreeOfFees = true;
        holders[address(this)].isFreeOfFees = true;
    }

    /* Functions */

    function buy() external payable {
        require(msg.value >= minDeposit, "Not enough deposit");
        uint256 fee = (msg.value * marketSpread) / 2000000;
        if (investors[msg.sender].deposits == 0) {
            investorsWithDeposits.push(msg.sender);
        }
        investors[msg.sender].deposits += msg.value - fee;
        investors[feeOwner].pendingWithdrawals += fee;
        emit TokenPurchaseRequested(msg.sender, msg.value);
    }

    function collectDeposits() external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(investmentsState == InvestmentsState.PendingCollection, "Not in the right state");
        uint256 totalDeposits = 0;
        for (uint256 i = investorsWithDeposits.length - 1; i >= 0; i--) {
            address iwd = investorsWithDeposits[i];
            totalDeposits += investors[iwd].deposits;
            investors[iwd].pendingInvestments += investors[iwd].deposits;
            investorsWithPendingInvestments.push(iwd);
            investors[iwd].deposits = 0;
            investorsWithDeposits.pop();
        }
        investmentsState = InvestmentsState.PendingInvestment;
        payable(depositAddress).transfer(totalDeposits);
        emit DepositsCollected(totalDeposits);
    }

    function mintPendingInvestments(uint256 _tokenEntryPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(investmentsState == InvestmentsState.PendingInvestment, "Not in the right state");
        for (uint256 i = investorsWithPendingInvestments.length - 1; i >= 0; i--) {
            address iwpi = investorsWithPendingInvestments[i];
            uint256 amountToMint = (investors[iwpi].pendingInvestments * (10**18)) / _tokenEntryPrice;
            _mint(iwpi, amountToMint);
            investors[iwpi].pendingInvestments = 0;
            investorsWithPendingInvestments.pop();
        }
        tokenPrice = _tokenEntryPrice;
        investmentsState = InvestmentsState.PendingCollection;
        emit TokenMinted();
    }

    /* TODO
    function sell(uint256 _amountToSell) external {
        require( )
    }*/

    function withdraw() external {
        uint256 amount = investors[msg.sender].pendingWithdrawals;
        investors[msg.sender].pendingWithdrawals = 0;
        payable(msg.sender).transfer(amount);
    }

    function getAccruedFees(address _holder) public view returns (uint256 accrued) {
        return super.balanceOf(_holder) - balanceOf(_holder);
    }

    function takeManagementFee(address _holder) internal {
        uint256 accruedFees = getAccruedFees(_holder);
        holders[_holder].lastFeeCharge = block.timestamp;
        _transfer(_holder, feeOwner, accruedFees);
    }

    // Overrides

    function balanceOf(address account) public view override returns (uint256) {
        if (holders[account].isFreeOfFees) return super.balanceOf(account);
        if (holders[account].lastFeeCharge == 0) return 0;
        uint256 secondsElapsed = block.timestamp - holders[account].lastFeeCharge;
        uint256 q = (10**14) / managementFeePerSecond;
        return fracExpNeg(super.balanceOf(account), q, secondsElapsed, 6);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        if (to != feeOwner) {
            // too ugly?
            takeManagementFee(from);
            takeManagementFee(to);
        }
    }

    // Updates

    function setMarketSpread(uint256 _marketSpread) external onlyRole(DEFAULT_ADMIN_ROLE) {
        marketSpread = _marketSpread;
    }

    function setManagementFeePerSecond(uint256 _managementFeePerSecond) external onlyRole(DEFAULT_ADMIN_ROLE) {
        managementFeePerSecond = _managementFeePerSecond;
    }

    function setPerformanceFee(uint256 _performanceFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        performanceFee = _performanceFee;
    }

    function setHurdleRate(uint256 _hurdleRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
        hurdleRate = _hurdleRate;
    }

    function setDepositAddress(address _depositAddress) external onlyRole(DEFAULT_ADMIN_ROLE) {
        depositAddress = _depositAddress;
    }

    function setFeeOwner(address _feeOwner) external onlyRole(DEFAULT_ADMIN_ROLE) {
        feeOwner = _feeOwner;
    }

    function setMinMaticDeposit(uint256 _minDeposit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minDeposit = _minDeposit;
    }

    // Utils

    /**
     * Computes k * (1 - 1/q) ^ N using p terms from the binomial expansion
     * keep p<=8, <=6 if N or q are in the order of 10⁸
     */
    function fracExpNeg(
        uint256 k,
        uint256 q,
        uint256 n,
        uint256 p
    ) internal pure returns (uint256) {
        uint256 s = 0;
        uint256 N = 1;
        uint256 B = 1;
        for (uint256 i = 0; i < p; i++) {
            uint256 bterm = (k * N) / B / (q**i);
            if (i % 2 == 0) s += bterm;
            else s -= bterm;
            N = N * (n - i);
            B = B * (i + 1);
        }
        return s;
    }
}
