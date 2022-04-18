import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { Greeter } from "../../src/types/contracts/Greeter";
import { Greeter__factory } from "../../src/types/factories/contracts/Greeter__factory";

task("deploy:Greeter")
  .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const greeterFactory: Greeter__factory = <Greeter__factory>await ethers.getContractFactory("Greeter", signers[0]);
    const greeter: Greeter = <Greeter>await greeterFactory.deploy(taskArguments.greeting);
    await greeter.deployed();
    console.log("Greeter deployed to: ", greeter.address);
  });
