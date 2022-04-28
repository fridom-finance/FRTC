import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { FRTC } from "../../src/types/contracts/FRTC";
import { FRTC__factory } from "../../src/types/factories/contracts/FRTC__factory";

task("prepareLiquidations")
  .addParam("frtcaddress")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const FRTCFactory: FRTC__factory = <FRTC__factory>await ethers.getContractFactory("FRTC", signers[0]);
    const frtc: FRTC = <FRTC>await FRTCFactory.attach(taskArguments.frtcaddress);

    await frtc.prepareLiquidations();
    console.log("Liquidations prepared");
  });
