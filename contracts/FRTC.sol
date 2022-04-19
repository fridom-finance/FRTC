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

    /* Structs */

    struct Investor {
        uint256 deposits; // Purchases pending for collection
        uint256 pendingInvestments; // Collected deposits
        uint256 soldUnits; // Sales pending for liquidation consideration
        uint256 pendingLiquidations; // Token units being liquidated
        uint256 pendingWithdrawals; // Pending for withdrawal
    }

    /* Storage */

    InvestmentsState public investmentsState = InvestmentsState.PendingCollection; // Investments global state

    address public feeOwner; // Address receiving fund and primary market fees
    address public depositAddress; // Address handling all the deposits

    // Fund fees
    uint256 public managementFeePerSecond; // Divide by 10¹⁴ to get raw managementFeePerSecond
    // Other Fees, divide by 10⁶ to get raw quantity
    uint256 public performanceFee;
    uint256 public hurdleRate;
    uint256 public marketSpread;

    mapping(address => Investor) private investors; // Address to their investor info
    address[] private investorsWithDeposits; // Investors having deposits pending for their collection
    address[] private investorsWithPendingInvestments; // Investors having deposits pending for their investment

    uint256 public tokenPrice; // Token price in terms of Matic
    uint256 public minMaticDeposit; //Minimum Matic required to purchase the token

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
        uint256 _minMaticDeposit
    ) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        feeOwner = _feeOwner;
        depositAddress = _depositAddress;
        managementFeePerSecond = _managementFeePerSecond;
        performanceFee = _performanceFee;
        hurdleRate = _hurdleRate;
        marketSpread = _marketSpread;
        minMaticDeposit = _minMaticDeposit;
    }

    /* Functions */

    function buy() external payable {
        require(msg.value >= minMaticDeposit, "Not enough Matic for deposit");
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
        for (uint256 d = investorsWithDeposits.length - 1; d >= 0; d--) {
            address iwd = investorsWithDeposits[d];
            totalDeposits += investors[iwd].deposits;
            investors[iwd].pendingInvestments += investors[iwd].deposits;
            investors[iwd].deposits = 0;
            investorsWithDeposits.pop();
        }
        investmentsState = InvestmentsState.PendingInvestment;
        payable(depositAddress).transfer(totalDeposits);
        emit DepositsCollected(totalDeposits);
    }

    function mintPendingInvestments() external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(investmentsState == InvestmentsState.PendingInvestment, "Not in the right state");

        investmentsState = InvestmentsState.PendingCollection;
        emit TokenMinted();
    }

    function withdraw() external {
        uint256 amount = investors[msg.sender].pendingWithdrawals;
        investors[msg.sender].pendingWithdrawals = 0;
        payable(msg.sender).transfer(amount);
    }

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

    function setMinMaticDeposit(uint256 _minMaticDeposit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        minMaticDeposit = _minMaticDeposit;
    }
}
