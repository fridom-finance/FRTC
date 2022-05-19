import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { FRTC } from "../../src/types/contracts/FRTC";
import { FRTC__factory } from "../../src/types/factories/contracts/FRTC__factory";

task("updateDepositAddress")
  .addParam("frtcaddress")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const FRTCFactory: FRTC__factory = <FRTC__factory>await ethers.getContractFactory("FRTC", signers[0]);
    const frtc: FRTC = <FRTC>await FRTCFactory.attach(taskArguments.frtcaddress);

    const newDepositAddress: string = "0x1c60A43dE353E1B0C6105FC5bdC07B4a2017E922";
    await frtc.setDepositAddress(newDepositAddress);
    console.log("New deposit address has been set to: ", newDepositAddress, "!");
  });
