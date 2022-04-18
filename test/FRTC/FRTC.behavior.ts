import { expect } from "chai";
import { BigNumber } from "ethers";

export function shouldHaveUpdatableStateVariables(): void {
  it("Should set a new market spread only for admin", async function () {
    const newMarketSpread: BigNumber = BigNumber.from(20000);
    await this.frtc.connect(this.signers.admin).setMarketSpread(newMarketSpread);
    expect(await this.frtc.connect(this.signers.nonAdmin).marketSpread()).to.equal(newMarketSpread);
    await expect(this.frtc.connect(this.signers.nonAdmin).setMarketSpread(newMarketSpread)).to.be.reverted;
  });

  it("Should set a new management fee only for admin", async function () {
    const newManagementFeePerSecond: BigNumber = BigNumber.from(200000);
    await this.frtc.connect(this.signers.admin).setManagementFeePerSecond(newManagementFeePerSecond);
    expect(await this.frtc.connect(this.signers.nonAdmin).managementFeePerSecond()).to.equal(newManagementFeePerSecond);
    await expect(this.frtc.connect(this.signers.nonAdmin).setManagementFeePerSecond(newManagementFeePerSecond)).to.be
      .reverted;
  });

  it("Should set a new performance fee only for admin", async function () {
    const newPerformanceFee: BigNumber = BigNumber.from(400000);
    await this.frtc.connect(this.signers.admin).setPerformanceFee(newPerformanceFee);
    expect(await this.frtc.connect(this.signers.nonAdmin).performanceFee()).to.equal(newPerformanceFee);
    await expect(this.frtc.connect(this.signers.nonAdmin).setPerformanceFee(newPerformanceFee)).to.be.reverted;
  });

  it("Should set a new hurdle rate only for admin", async function () {
    const newHurdleRate: BigNumber = BigNumber.from(400000);
    await this.frtc.connect(this.signers.admin).setHurdleRate(newHurdleRate);
    expect(await this.frtc.connect(this.signers.nonAdmin).hurdleRate()).to.equal(newHurdleRate);
    await expect(this.frtc.connect(this.signers.nonAdmin).setHurdleRate(newHurdleRate)).to.be.reverted;
  });

  it("Should set a new deposit address only for admin", async function () {
    const newDepositAddress: string = "0x5c4d5a6b78c5b456a5c87b654c24b6a487b564dc";
    await this.frtc.connect(this.signers.admin).setDepositAddress(newDepositAddress);
    expect((await this.frtc.connect(this.signers.nonAdmin).depositAddress()).toUpperCase()).to.equal(
      newDepositAddress.toUpperCase(),
    );
    await expect(this.frtc.connect(this.signers.nonAdmin).setDepositAddress(newDepositAddress)).to.be.reverted;
  });

  it("Should set a new fee owner only for admin", async function () {
    const newFeeOwner: string = "0xee4d5a6b78c5b45ee5cf7b654c24ffa487bee4dc";
    await this.frtc.connect(this.signers.admin).setFeeOwner(newFeeOwner);
    expect((await this.frtc.connect(this.signers.nonAdmin).feeOwner()).toUpperCase()).to.equal(
      newFeeOwner.toUpperCase(),
    );
    await expect(this.frtc.connect(this.signers.nonAdmin).setFeeOwner(newFeeOwner)).to.be.reverted;
  });
}
