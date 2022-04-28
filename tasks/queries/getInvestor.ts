import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { FRTC } from "../../src/types/contracts/FRTC";
import { FRTC__factory } from "../../src/types/factories/contracts/FRTC__factory";

task("getInvestor")
  .addParam("frtcaddress")
  .addParam("investoraddress")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const FRTCFactory: FRTC__factory = <FRTC__factory>await ethers.getContractFactory("FRTC", signers[0]);
    const frtc: FRTC = <FRTC>await FRTCFactory.attach(taskArguments.frtcaddress);

    const investor = await frtc.investors(taskArguments.investoraddress);
    console.log("Investor info:");
    console.log("Deposits ", investor.deposits);
    console.log("Pending investments ", investor.pendingInvestments);
    console.log("Tokens to sell ", investor.tokensToSell);
    console.log("Pending liquidations ", investor.pendingLiquidations);
    console.log("Pending withdrawals ", investor.pendingWithdrawals);
  });
