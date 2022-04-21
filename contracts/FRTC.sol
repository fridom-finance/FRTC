// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./CustodialMarket.sol";

contract FRTC is ERC20, CustodialMarket {
    /* Structs */

    struct Holder {
        uint256 lastFeeCharge; // timestamp of last time the management fee was charged
        bool isFreeOfFees; // Does the holder have to pay fees?
    }

    /* Storage */

    uint256 public managementFeePerSecond; // Divide by 10¹⁴ to get raw managementFeePerSecond
    mapping(address => Holder) private holders; // Address to their holder info

    /* Constructor */

    constructor(
        uint256 _marketSpread,
        uint256 _minDeposit,
        uint256 _minWithdrawal,
        address _defaultAdmin,
        address _feeOwner,
        address _depositAddress,
        uint256 _managementFeePerSecond
    ) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        feeOwner = _feeOwner;
        depositAddress = _depositAddress;
        managementFeePerSecond = _managementFeePerSecond;
        marketSpread = _marketSpread;
        minDeposit = _minDeposit;
        minWithdrawal = _minWithdrawal;

        holders[address(0)].isFreeOfFees = true;
        holders[address(this)].isFreeOfFees = true;
        holders[address(feeOwner)].isFreeOfFees = true;
    }

    /* Functions */

    function mintPendingInvestments(uint256 _tokenEntryPrice)
        external
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyInvestmentState(InvestmentStates.PendingInvestment)
    {
        for (uint256 i = investorsWithPendingInvestments.length - 1; i >= 0; i--) {
            address iwpi = investorsWithPendingInvestments[i];
            uint256 amountToMint = (investors[iwpi].pendingInvestments * (10**18)) / _tokenEntryPrice;
            _mint(iwpi, amountToMint);
            investors[iwpi].pendingInvestments = 0;
            investorsWithPendingInvestments.pop();
        }
        tokenPrice = _tokenEntryPrice;
        investmentState = InvestmentStates.PendingCollection;
        emit TokenMinted(_tokenEntryPrice);
    }

    function sell(uint256 _amountToSell) external override {
        require(_amountToSell >= minWithdrawal, "Liquidation: Not enough amount to withdraw");
        if (investors[msg.sender].tokensToSell == 0) {
            investorsWithTokensToSell.push(msg.sender);
        }
        investors[msg.sender].tokensToSell += _amountToSell;
        _transfer(msg.sender, address(this), _amountToSell);
        emit TokenSaleRequested(msg.sender, _amountToSell);
    }

    function liquidate(uint256 _tokenExitPrice)
        external
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyLiquidationState(LiquidationStates.PendingLiquidation)
    {
        uint256 liquidationPrice = ((_tokenExitPrice) * (2000000 - marketSpread)) / 2000000;
        investors[feeOwner].pendingWithdrawals += (_tokenExitPrice - liquidationPrice) * totalAmountToLiquidate;
        for (uint256 i = investorsWithPendingLiquidations.length - 1; i >= 0; i--) {
            address iwpl = investorsWithPendingLiquidations[i];
            investors[iwpl].pendingWithdrawals += liquidationPrice * investors[iwpl].pendingLiquidations;
            investors[iwpl].pendingLiquidations = 0;
            investorsWithPendingLiquidations.pop();
        }
        _burn(address(this), totalAmountToLiquidate);
        totalAmountToLiquidate = 0;
        tokenPrice = _tokenExitPrice;
        liquidationState = LiquidationStates.PendingPreparation;
        emit TokensLiquidated(_tokenExitPrice);
    }

    function getAccruedFees(address _holder) public view returns (uint256 accrued) {
        return super.balanceOf(_holder) - balanceOf(_holder);
    }

    function takeManagementFee(address _holder) public {
        uint256 accruedFees = getAccruedFees(_holder);
        holders[_holder].lastFeeCharge = block.timestamp;
        _transfer(_holder, feeOwner, accruedFees);
    }

    function balanceOf(address account) public view override returns (uint256) {
        if (holders[account].lastFeeCharge == 0 || holders[account].isFreeOfFees) return super.balanceOf(account);
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

    function setManagementFeePerSecond(uint256 _managementFeePerSecond) external onlyRole(DEFAULT_ADMIN_ROLE) {
        managementFeePerSecond = _managementFeePerSecond;
    }

    function setHolderFreeOfFees(address _holder, bool _newValue) external onlyRole(DEFAULT_ADMIN_ROLE) {
        holders[_holder].isFreeOfFees = _newValue;
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
