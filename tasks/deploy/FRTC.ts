import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { FRTC } from "../../src/types/contracts/FRTC";
import { FRTC__factory } from "../../src/types/factories/contracts/FRTC__factory";

task("deploy:FRTC").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners();

  const defaultAdmin: SignerWithAddress = signers[0];
  const feeOwner: string = signers[1].address;
  const depositAddress: string = signers[2].address;
  const marketSpread: BigNumber = BigNumber.from(10000);
  const streamingFee: BigNumber = BigNumber.from(10).pow(16).mul(2);
  const minDeposit: BigNumber = BigNumber.from(10).pow(18).mul(20);
  const minWithdrawal: BigNumber = BigNumber.from(10).pow(17).mul(2);

  const FRTCFactory: FRTC__factory = <FRTC__factory>await ethers.getContractFactory("FRTC", defaultAdmin);
  const frtc: FRTC = <FRTC>(
    await FRTCFactory.deploy(
      defaultAdmin.address,
      feeOwner,
      depositAddress,
      marketSpread,
      streamingFee,
      minDeposit,
      minWithdrawal,
    )
  );
  await frtc.deployed();
  console.log("FRTC deployed to: ", frtc.address);
});
