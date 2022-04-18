import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import type { FRTC } from "../src/types/contracts/FRTC";
import type { Greeter } from "../src/types/contracts/Greeter";

declare module "mocha" {
  export interface Context {
    frtc: FRTC;
    greeter: Greeter;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  nonAdmin: SignerWithAddress;
  feeOwner: SignerWithAddress;
  depositAddress: SignerWithAddress;
}
