// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FRTC is ERC20, AccessControl {
    // Address receiving fund and primary market fees
    address public feeOwner;
    // Address handling all the deposits
    address public depositAddress;

    // Fund fees
    // Divide by 10¹⁴ to get raw managementFeePerSecond
    uint256 public managementFeePerSecond;
    // Fees, divide by 10⁶ to get raw quantity
    uint256 public performanceFee;
    uint256 public hurdleRate;
    uint256 public marketSpread;

    // Purchases pending for collection
    mapping(address => uint256) public deposits;
    // Collected deposits
    mapping(address => uint256) public pendingInvestments;
    // Sales pending for consideration
    mapping(address => uint256) public soldUnits;
    // Units being liquidated
    mapping(address => uint256) public pendingLiquidations;

    constructor(
        address _defaultAdmin,
        address _feeOwner,
        address _depositAddress,
        uint256 _managementFeePerSecond,
        uint256 _performanceFee,
        uint256 _hurdleRate,
        uint256 _marketSpread
    ) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        feeOwner = _feeOwner;
        depositAddress = _depositAddress;
        managementFeePerSecond = _managementFeePerSecond;
        performanceFee = _performanceFee;
        hurdleRate = _hurdleRate;
        marketSpread = _marketSpread;
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
}
