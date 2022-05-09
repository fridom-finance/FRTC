import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";

import type { FRTC } from "../src/types/contracts/FRTC";

declare module "mocha" {
  export interface Context {
    frtc: FRTC;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  nonAdmin: SignerWithAddress;
  nonAdmin2: SignerWithAddress;
  feeOwner: SignerWithAddress;
  depositAddress: SignerWithAddress;
}
