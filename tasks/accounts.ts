import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";

task("accounts", "Get balance of account", async (_taskArgs, hre) => {
  const accounts: Signer[] = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});
