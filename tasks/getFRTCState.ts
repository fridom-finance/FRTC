import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { FRTC } from "../src/types/contracts/FRTC";
import { FRTC__factory } from "../src/types/factories/contracts/FRTC__factory";

task("getFRTCState")
  .addParam("frtcaddress")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const FRTCFactory: FRTC__factory = <FRTC__factory>await ethers.getContractFactory("FRTC", signers[0]);
    const frtc: FRTC = <FRTC>await FRTCFactory.attach(taskArguments.frtcaddress);

    console.log(
      "Investors state (deposits,pendingInvestments,tokensToSell,pendingLiquidations): ",
      await frtc.getInvestorsState(),
    );
    console.log("0->pendingCollection,1->pendingInvestment: ", await frtc.investmentState());
    console.log("0->pendingPreparation,1->pendingLiquidation: ", await frtc.liquidationState());
    console.log("Total amount to liquidate: ", await frtc.totalAmountToLiquidate());
    console.log("feeOwner", await frtc.feeOwner());
    console.log("Deposit address", await frtc.depositAddress());
    console.log("Last streaming fee timestamp", await frtc.lastStreamingFeeTimestamp());
    console.log("Token price: ", await frtc.tokenPrice());
    console.log("MinDeposit: ", await frtc.minDeposit());
    console.log("MinWithdrawal: ", await frtc.minWithdrawal());
    console.log("Market Spread: ", await frtc.marketSpread());
    console.log("Streaming fee", await frtc.streamingFee());
  });
