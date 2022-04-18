import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { FRTC } from "../../src/types/contracts/FRTC";
import { Signers } from "../types";
import { shouldHaveUpdatableStateVariables } from "./FRTC.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.nonAdmin = signers[1];
    this.signers.feeOwner = signers[2];
    this.signers.depositAddress = signers[3];
  });

  describe("FRTC", function () {
    beforeEach(async function () {
      const defaultAdmin: string = await this.signers.admin.getAddress();
      const feeOwner: string = await this.signers.feeOwner.getAddress();
      const depositAddress: string = await this.signers.depositAddress.getAddress();
      const FRTCArtifact: Artifact = await artifacts.readArtifact("FRTC");
      const constrArgs = [defaultAdmin, feeOwner, depositAddress, 146000, 200000, 100000, 10000];
      //5% annually, 20%, 10%, 1%
      this.frtc = <FRTC>await waffle.deployContract(this.signers.admin, FRTCArtifact, constrArgs);
    });

    it("Should have initialized variables correctly from constructor arguments", async function () {
      const feeOwner: string = await this.signers.feeOwner.getAddress();
      const depositAddress: string = await this.signers.depositAddress.getAddress();

      expect(await this.frtc.connect(this.signers.nonAdmin).feeOwner()).to.equal(feeOwner);
      expect(await this.frtc.connect(this.signers.nonAdmin).depositAddress()).to.equal(depositAddress);
      expect(await this.frtc.connect(this.signers.nonAdmin).managementFeePerSecond()).to.equal(146000);
      expect(await this.frtc.connect(this.signers.nonAdmin).performanceFee()).to.equal(200000);
      expect(await this.frtc.connect(this.signers.nonAdmin).hurdleRate()).to.equal(100000);
      expect(await this.frtc.connect(this.signers.nonAdmin).marketSpread()).to.equal(10000);
    });

    shouldHaveUpdatableStateVariables();
  });
});
