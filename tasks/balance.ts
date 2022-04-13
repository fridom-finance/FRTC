import { Signer } from "@ethersproject/abstract-signer";
import { task, types } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("balance", "Prints the list of accounts")
  .addParam("index", "Index of account", 0, types.int)
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const accounts: Signer[] = await hre.ethers.getSigners();
    console.log(await accounts[taskArguments.index].getBalance());
  });
