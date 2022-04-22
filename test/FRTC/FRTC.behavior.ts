import { expect } from "chai";
import { BigNumber } from "ethers";

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
