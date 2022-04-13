// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FRTC is ERC20, AccessControl {
    // Address where all the fees are deposited
    address public feeOwner;
    // Address handling all the deposits
    address public depositAddress;

    // Fees, divide by 1000000 to get raw rate
    // Fund fees
    uint256 public managementFee;
    uint256 public performanceFee;
    uint256 public hurdleRate;
    // Primary market spread
    uint256 public marketSpread;

    // Purchases pending for collection
    mapping(address => uint256) public deposits;
    // Collected deposits
    mapping(address => uint256) public pendingInvestments;
    // Sales pending for consideration
    mapping(address => uint256) public soldUnits;
    // Units being liquidated
    mapping(address => uint256) public pendingLiquidations;

    constructor(address defaultAdmin) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }
}
