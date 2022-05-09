import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import type { FRTC } from "../../src/types/contracts/FRTC";
import { Signers } from "../types";
import {
  shouldAccrueFees,
  shouldHaveUpdatableStateVariables,
  shouldReceiveDepositsAndMintTokens,
  shouldSellAndLiquidateTokens,
} from "./FRTC.behavior";

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
      const streamingFee: BigNumber = BigNumber.from(10).pow(16).mul(2);
      const minDeposit: BigNumber = BigNumber.from(10).pow(18).mul(100);
      const minWithdrawal: BigNumber = BigNumber.from(10).pow(18);

      const constrArgs = [
        defaultAdmin,
        feeOwner,
        depositAddress,
        marketSpread,
        streamingFee,
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
      expect(await this.frtc.streamingFee()).to.equal(BigNumber.from(10).pow(16).mul(2));
      expect(await this.frtc.marketSpread()).to.equal(BigNumber.from(10000));
      expect(await this.frtc.minDeposit()).to.equal(BigNumber.from(10).pow(18).mul(100));
      expect(await this.frtc.minWithdrawal()).to.equal(BigNumber.from(10).pow(18));
    });

    shouldHaveUpdatableStateVariables();
    shouldReceiveDepositsAndMintTokens();
    shouldSellAndLiquidateTokens();
    shouldAccrueFees();
  });
});
