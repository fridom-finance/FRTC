import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { FRTC } from "../../src/types/contracts/FRTC";
import type { MathTester } from "../../src/types/contracts/MathTester";
import { Signers } from "../types";
import { shouldHaveUpdatableStateVariables, shouldReceiveDepositsAndMintTokens } from "./FRTC.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.nonAdmin = signers[1];
    this.signers.nonAdmin2 = signers[2];
    this.signers.feeOwner = signers[3];
    this.signers.depositAddress = signers[4];
  });

  describe("FRTC", function () {
    beforeEach(async function () {
      const FRTCArtifact: Artifact = await artifacts.readArtifact("FRTC");

      const defaultAdmin: string = await this.signers.admin.getAddress();
      const feeOwner: string = await this.signers.feeOwner.getAddress();
      const depositAddress: string = await this.signers.depositAddress.getAddress();
      const marketSpread: BigNumber = BigNumber.from(10000);
      const managementFeePerSecond: BigNumber = BigNumber.from(146000);
      const kReducer: BigNumber = BigNumber.from(10).pow(12);
      const minDeposit: BigNumber = BigNumber.from(10).pow(18).mul(100);
      const minWithdrawal: BigNumber = BigNumber.from(10).pow(18);

      const constrArgs = [
        defaultAdmin,
        feeOwner,
        depositAddress,
        marketSpread,
        managementFeePerSecond,
        kReducer,
        minDeposit,
        minWithdrawal,
      ];
      this.frtc = <FRTC>await waffle.deployContract(this.signers.admin, FRTCArtifact, constrArgs);
    });

    it("Should have initialized variables correctly from constructor arguments", async function () {
      const feeOwner: string = await this.signers.feeOwner.getAddress();
      const depositAddress: string = await this.signers.depositAddress.getAddress();

      expect(await this.frtc.feeOwner()).to.equal(feeOwner);
      expect(await this.frtc.depositAddress()).to.equal(depositAddress);
      expect(await this.frtc.managementFeePerSecond()).to.equal(BigNumber.from(146000));
      expect(await this.frtc.marketSpread()).to.equal(BigNumber.from(10000));
      expect(await this.frtc.minDeposit()).to.equal(BigNumber.from(10).pow(18).mul(100));
      expect(await this.frtc.minWithdrawal()).to.equal(BigNumber.from(10).pow(18));
    });

    shouldHaveUpdatableStateVariables();
    shouldReceiveDepositsAndMintTokens();
  });

  describe("Math", function () {
    beforeEach(async function () {
      const MathArtifact: Artifact = await artifacts.readArtifact("MathTester");
      this.math = <MathTester>await waffle.deployContract(this.signers.admin, MathArtifact, []);
    });
    it("Should compute accurately enough diverse fractional exponentials", async function () {
      let k: BigNumber = BigNumber.from(4000000); // 4 token units
      let q: BigNumber = BigNumber.from(684931506); // mfps = 146000 * 10¹⁴
      let n: BigNumber = BigNumber.from(315360000); // 10 years
      let p: BigNumber = BigNumber.from(6); // 6 iterations
      let val: BigNumber = await this.math.testFracExpNeg(k, q, n, p);
      console.log(val.toNumber());
      expect(val).to.be.closeTo(BigNumber.from(2524060), BigNumber.from(100)); // precision of 0.0001
      k = BigNumber.from(10000000000); // 10000 token units
      n = BigNumber.from(315360000); // 10 years
      val = await this.math.testFracExpNeg(k, q, n, p);
      console.log(val.toNumber());
      expect(val).to.be.closeTo(BigNumber.from(6310150281), BigNumber.from(200000)); // precision of 0.2
      k = BigNumber.from(100000000000); // 100000 token units
      n = BigNumber.from(315360000); // 10 years
      val = await this.math.testFracExpNeg(k, q, n, p);
      console.log(val.toNumber());
      expect(val).to.be.closeTo(BigNumber.from(63101502810), BigNumber.from(2000000)); // precision of 2
      k = BigNumber.from(10000000); // 10 token units
      n = BigNumber.from(630720000); // 20 years
      val = await this.math.testFracExpNeg(k, q, n, p);
      console.log(val.toNumber());
      expect(val).to.be.closeTo(BigNumber.from(3981799), BigNumber.from(10000)); // precision of 0.01
      k = BigNumber.from(1000000000000); // 1000000 token units
      n = BigNumber.from(31536000); // 1 year
      val = await this.math.testFracExpNeg(k, q, n, p);
      console.log(val.toNumber());
      expect(val).to.be.closeTo(BigNumber.from(955001316400), BigNumber.from(100)); // precision of 0.0001
    });
  });
});
