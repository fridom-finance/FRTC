// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./CustodialMarket.sol";

contract FRTC is ERC20, CustodialMarket {
    /* Constants */

    uint256 private constant ONE_YEAR_IN_SECONDS = 365 days;

    /* Storage */

    uint256 public lastStreamingFeeTimestamp; // Timestamp last streaming fee was accrued
    uint256 public streamingFee; // annual management fee,  1% = 10¹⁶

    /* Events */

    event FeeTaken(uint256 amount);

    /* Constructor */

    constructor(
        address _defaultAdmin,
        address _feeOwner,
        address _depositAddress,
        uint256 _marketSpread,
        uint256 _streamingFee,
        uint256 _minDeposit,
        uint256 _minWithdrawal
    ) ERC20("Fridom Top Currencies", "FRTC") {
        _setupRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        feeOwner = _feeOwner;
        depositAddress = _depositAddress;
        streamingFee = _streamingFee;
        marketSpread = _marketSpread;
        minDeposit = _minDeposit;
        minWithdrawal = _minWithdrawal;

        lastStreamingFeeTimestamp = block.timestamp;
    }

    /* Functions */

    function mintPendingInvestments(uint256 _tokenEntryPrice)
        external
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyInvestmentState(InvestmentStates.PendingInvestment)
    {
        for (uint256 i = investorsWithPendingInvestments.length; i > 0; i--) {
            address iwpi = investorsWithPendingInvestments[i - 1];
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
        payable
        override
        onlyRole(DEFAULT_ADMIN_ROLE)
        onlyLiquidationState(LiquidationStates.PendingLiquidation)
    {
        require(
            msg.value >= (_tokenExitPrice * totalAmountToLiquidate) / (10**18),
            "Not enough native token for liquidation"
        );
        uint256 liquidationPrice = ((_tokenExitPrice) * (2000000 - marketSpread)) / 2000000;
        investors[feeOwner].pendingWithdrawals += msg.value - ((liquidationPrice * totalAmountToLiquidate) / (10**18));
        for (uint256 i = investorsWithPendingLiquidations.length; i > 0; i--) {
            address iwpl = investorsWithPendingLiquidations[i - 1];
            investors[iwpl].pendingWithdrawals += ((liquidationPrice * investors[iwpl].pendingLiquidations) / (10**18));
            investors[iwpl].pendingLiquidations = 0;
            investorsWithPendingLiquidations.pop();
        }
        _burn(address(this), totalAmountToLiquidate);
        totalAmountToLiquidate = 0;
        tokenPrice = _tokenExitPrice;
        liquidationState = LiquidationStates.PendingPreparation;
        emit TokensLiquidated(_tokenExitPrice);
    }

    function accrueFee() public {
        uint256 timeSinceLastFee = block.timestamp - lastStreamingFeeTimestamp;
        uint256 feePercentage = (timeSinceLastFee * streamingFee) / ONE_YEAR_IN_SECONDS;
        uint256 feeQuantity = (feePercentage * totalSupply()) / (10**18);
        _mint(feeOwner, feeQuantity);
        lastStreamingFeeTimestamp = block.timestamp;
        emit FeeTaken(feeQuantity);
    }

    // Updates

    function setStreamingFee(uint256 _streamingFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        streamingFee = _streamingFee;
    }
}
