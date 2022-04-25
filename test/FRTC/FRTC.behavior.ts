import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export function shouldHaveUpdatableStateVariables(): void {
  it("Should set a new market spread only by admin", async function () {
    const newMarketSpread: BigNumber = BigNumber.from(20000);
    await this.frtc.connect(this.signers.admin).setMarketSpread(newMarketSpread);
    expect(await this.frtc.marketSpread()).to.equal(newMarketSpread);
    await expect(this.frtc.connect(this.signers.nonAdmin).setMarketSpread(newMarketSpread)).to.be.reverted;
  });

  it("Should set a new management fee only by admin", async function () {
    const newManagementFeePerSecond: BigNumber = BigNumber.from(200000);
    await this.frtc.connect(this.signers.admin).setManagementFeePerSecond(newManagementFeePerSecond);
    expect(await this.frtc.managementFeePerSecond()).to.equal(newManagementFeePerSecond);
    await expect(this.frtc.connect(this.signers.nonAdmin).setManagementFeePerSecond(newManagementFeePerSecond)).to.be
      .reverted;
  });

  it("Should set a new kReducer only by admin", async function () {
    const newkReducer: BigNumber = BigNumber.from(10).pow(10);
    await this.frtc.connect(this.signers.admin).setKReducer(newkReducer);
    expect(await this.frtc.kReducer()).to.equal(newkReducer);
    await expect(this.frtc.connect(this.signers.nonAdmin).setKReducer(newkReducer)).to.be.reverted;
  });

  it("Should set a new deposit address only by admin", async function () {
    const newDepositAddress: string = "0x5c4d5a6b78c5b456a5c87b654c24b6a487b564dc";
    await this.frtc.connect(this.signers.admin).setDepositAddress(newDepositAddress);
    expect((await this.frtc.depositAddress()).toUpperCase()).to.equal(newDepositAddress.toUpperCase());
    await expect(this.frtc.connect(this.signers.nonAdmin).setDepositAddress(newDepositAddress)).to.be.reverted;
  });

  it("Should set a new fee owner only by admin", async function () {
    const newFeeOwner: string = "0xee4d5a6b78c5b45ee5cf7b654c24ffa487bee4dc";
    await this.frtc.connect(this.signers.admin).setFeeOwner(newFeeOwner);
    expect((await this.frtc.feeOwner()).toUpperCase()).to.equal(newFeeOwner.toUpperCase());
    await expect(this.frtc.connect(this.signers.nonAdmin).setFeeOwner(newFeeOwner)).to.be.reverted;
  });

  it("Should set the isFreeOfFees field of address only by admin", async function () {
    const nonAdminAddress = await this.signers.nonAdmin.getAddress();
    expect((await this.frtc.connect(this.signers.nonAdmin).holders(nonAdminAddress)).isFreeOfFees).to.equal(false);
    await this.frtc.connect(this.signers.admin).setHolderFreeOfFees(nonAdminAddress, true);
    expect((await this.frtc.holders(nonAdminAddress)).isFreeOfFees).to.equal(true);
    await expect(this.frtc.connect(this.signers.nonAdmin).setHolderFreeOfFees(nonAdminAddress, true)).to.be.reverted;
  });
}

export function shouldReceiveDepositsAndMintTokens(): void {
  it("Should receive a new deposit and change state variables", async function () {
    const defaultBalance: BigNumber = BigNumber.from(10).pow(18).mul(10000);
    const zero: BigNumber = BigNumber.from(0);

    expect(await ethers.provider.getBalance(this.frtc.address)).to.equal(zero);
    expect(await this.signers.nonAdmin.getBalance()).to.equal(defaultBalance);
    expect((await this.frtc.investors(this.signers.nonAdmin.address)).deposits).to.equal(zero);
    expect((await this.frtc.investors(this.signers.feeOwner.address)).pendingWithdrawals).to.equal(zero);
    let investorsState = await this.frtc.getInvestorsState();
    expect(investorsState[0]).to.equal(zero);
    expect(investorsState[1]).to.equal(zero);
    expect(investorsState[2]).to.equal(zero);
    expect(investorsState[3]).to.equal(zero);

    const amountToDeposit: BigNumber = BigNumber.from(10).pow(18).mul(100);
    const marketSpread: BigNumber = BigNumber.from(10000);
    const feeTaken: BigNumber = amountToDeposit.mul(marketSpread).div(BigNumber.from(10).pow(6).mul(2));

    await expect(this.frtc.connect(this.signers.nonAdmin).buy({ value: amountToDeposit }))
      .to.emit(this.frtc, "TokenPurchaseRequested")
      .withArgs(this.signers.nonAdmin.address, amountToDeposit);

    expect(await ethers.provider.getBalance(this.frtc.address)).to.equal(amountToDeposit);
    expect((await this.frtc.investors(this.signers.feeOwner.address)).pendingWithdrawals).to.equal(feeTaken);
    expect((await this.frtc.investors(this.signers.nonAdmin.address)).deposits).to.equal(amountToDeposit.sub(feeTaken));
    expect(await this.signers.nonAdmin.getBalance()).to.lt(defaultBalance.sub(amountToDeposit));
    investorsState = await this.frtc.getInvestorsState();
    expect(investorsState[0]).to.equal(BigNumber.from(1));
    expect(investorsState[1]).to.equal(zero);
    expect(investorsState[2]).to.equal(zero);
    expect(investorsState[3]).to.equal(zero);
  });

  it("Should fail on deposit lower than minimum", async function () {
    const amountToDeposit: BigNumber = BigNumber.from(10).pow(18).mul(99);
    await expect(this.frtc.connect(this.signers.nonAdmin).buy({ value: amountToDeposit })).to.be.reverted;
  });

  it("Should collect all deposits only by admin and change state variables", async function () {
    const defaultBalance: BigNumber = BigNumber.from(10).pow(18).mul(10000);
    const amountToDeposit: BigNumber = BigNumber.from(10).pow(18).mul(150);
    const amountToDeposit2: BigNumber = BigNumber.from(10).pow(18).mul(200);
    const marketSpread: BigNumber = BigNumber.from(10000);
    const feeTaken: BigNumber = amountToDeposit.mul(marketSpread).div(BigNumber.from(10).pow(6).mul(2));
    const feeTaken2: BigNumber = amountToDeposit2.mul(marketSpread).div(BigNumber.from(10).pow(6).mul(2));
    const zero: BigNumber = BigNumber.from(0);
    const totalDeposits: BigNumber = amountToDeposit.add(amountToDeposit2).sub(feeTaken).sub(feeTaken2);

    await this.frtc.connect(this.signers.nonAdmin).buy({ value: amountToDeposit });
    await this.frtc.connect(this.signers.nonAdmin2).buy({ value: amountToDeposit2 });
    expect(await this.frtc.investmentState()).to.equal(0);
    await expect(this.frtc.connect(this.signers.nonAdmin).collectDeposits()).to.be.reverted;
    await expect(this.frtc.connect(this.signers.admin).collectDeposits())
      .to.emit(this.frtc, "DepositsCollected")
      .withArgs(totalDeposits);

    expect((await this.frtc.investors(this.signers.nonAdmin.address)).deposits).to.equal(zero);
    expect((await this.frtc.investors(this.signers.nonAdmin2.address)).deposits).to.equal(zero);
    expect((await this.frtc.investors(this.signers.nonAdmin.address)).pendingInvestments).to.equal(
      amountToDeposit.sub(feeTaken),
    );
    expect((await this.frtc.investors(this.signers.nonAdmin2.address)).pendingInvestments).to.equal(
      amountToDeposit2.sub(feeTaken2),
    );
    expect((await this.frtc.investors(this.signers.feeOwner.address)).pendingWithdrawals).to.equal(
      feeTaken.add(feeTaken2),
    );
    let investorsState = await this.frtc.getInvestorsState();
    expect(investorsState[0]).to.equal(zero);
    expect(investorsState[1]).to.equal(BigNumber.from(2));
    expect(investorsState[2]).to.equal(zero);
    expect(investorsState[3]).to.equal(zero);
    expect(await this.signers.depositAddress.getBalance()).to.equal(totalDeposits.add(defaultBalance));
    expect(await this.frtc.investmentState()).to.equal(1);
  });

  it("Should mint tokens pro rata the investments only by admin", async function () {
    const defaultBalance: BigNumber = BigNumber.from(10).pow(18).mul(10000);
    const zero: BigNumber = BigNumber.from(0);
    const amountToDeposit: BigNumber = BigNumber.from(10).pow(18).mul(150);
    const amountToDeposit2: BigNumber = BigNumber.from(10).pow(18).mul(200);
    const marketSpread: BigNumber = BigNumber.from(10000);
    const feeTaken: BigNumber = amountToDeposit.mul(marketSpread).div(BigNumber.from(10).pow(6).mul(2));
    const feeTaken2: BigNumber = amountToDeposit2.mul(marketSpread).div(BigNumber.from(10).pow(6).mul(2));
    const entryPrice: BigNumber = BigNumber.from(10).pow(17).mul(1022);
    const tokenBalance: BigNumber = amountToDeposit.sub(feeTaken).mul(BigNumber.from(10).pow(18)).div(entryPrice);
    const tokenBalance2: BigNumber = amountToDeposit2.sub(feeTaken2).mul(BigNumber.from(10).pow(18)).div(entryPrice);

    await this.frtc.connect(this.signers.nonAdmin).buy({ value: amountToDeposit });
    await this.frtc.connect(this.signers.nonAdmin2).buy({ value: amountToDeposit2 });
    await this.frtc.connect(this.signers.admin).collectDeposits();
    await expect(this.frtc.connect(this.signers.admin).collectDeposits()).to.be.reverted;
    await expect(this.frtc.connect(this.signers.nonAdmin).mintPendingInvestments(entryPrice)).to.be.reverted;
    await expect(this.frtc.connect(this.signers.admin).mintPendingInvestments(entryPrice))
      .to.emit(this.frtc, "TokenMinted")
      .withArgs(entryPrice);
    expect(await this.frtc.tokenPrice()).to.equal(entryPrice);
    expect(await this.frtc.investmentState()).to.equal(0);
    let investorsState = await this.frtc.getInvestorsState();
    expect(investorsState[0]).to.equal(zero);
    expect(investorsState[1]).to.equal(zero);
    expect(investorsState[2]).to.equal(zero);
    expect(investorsState[3]).to.equal(zero);
    expect((await this.frtc.investors(this.signers.nonAdmin.address)).pendingInvestments).to.equal(zero);
    expect((await this.frtc.investors(this.signers.nonAdmin2.address)).pendingInvestments).to.equal(zero);
    expect(await this.frtc.balanceOf(this.signers.nonAdmin.address)).to.equal(tokenBalance);
    expect(await this.frtc.balanceOf(this.signers.nonAdmin2.address)).to.equal(tokenBalance2);
  });
}

export function shouldTransferTokensAndTakeManagementFee(): void {
  it("Should transfer tokens", async function () {
    const amountToDeposit: BigNumber = BigNumber.from(10).pow(18).mul(150);
    const entryPrice: BigNumber = BigNumber.from(10).pow(17).mul(1022);
    const amountToTransferFail: BigNumber = BigNumber.from(10).pow(18).mul(2);
    const amountToTransfer: BigNumber = BigNumber.from(10).pow(17).mul(5);
    await this.frtc.connect(this.signers.nonAdmin).buy({ value: amountToDeposit });
    await this.frtc.connect(this.signers.admin).collectDeposits();
    await this.frtc.connect(this.signers.admin).mintPendingInvestments(entryPrice);
    await expect(
      this.frtc.connect(this.signers.nonAdmin).transfer(this.signers.nonAdmin2.address, amountToTransferFail),
    ).to.be.reverted;
    await this.frtc.connect(this.signers.nonAdmin).transfer(this.signers.nonAdmin2.address, amountToTransfer);
    expect(await this.frtc.balanceOf(this.signers.nonAdmin.address)).to.lt(
      amountToDeposit.mul(BigNumber.from(10).pow(18)).div(entryPrice).sub(amountToTransfer),
    );
    expect(await this.frtc.balanceOf(this.signers.nonAdmin2.address)).to.equal(amountToTransfer);
  });
}
