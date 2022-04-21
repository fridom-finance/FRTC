/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface CustodialMarketInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "buy()": FunctionFragment;
    "collectDeposits()": FunctionFragment;
    "depositAddress()": FunctionFragment;
    "feeOwner()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "investmentState()": FunctionFragment;
    "liquidate(uint256)": FunctionFragment;
    "liquidationState()": FunctionFragment;
    "marketSpread()": FunctionFragment;
    "minDeposit()": FunctionFragment;
    "minWithdrawal()": FunctionFragment;
    "mintPendingInvestments(uint256)": FunctionFragment;
    "prepareLiquidations()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "sell(uint256)": FunctionFragment;
    "setDepositAddress(address)": FunctionFragment;
    "setFeeOwner(address)": FunctionFragment;
    "setMarketSpread(uint256)": FunctionFragment;
    "setMinDeposit(uint256)": FunctionFragment;
    "setMinWithdrawal(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "tokenPrice()": FunctionFragment;
    "totalAmountToLiquidate()": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "buy"
      | "collectDeposits"
      | "depositAddress"
      | "feeOwner"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "investmentState"
      | "liquidate"
      | "liquidationState"
      | "marketSpread"
      | "minDeposit"
      | "minWithdrawal"
      | "mintPendingInvestments"
      | "prepareLiquidations"
      | "renounceRole"
      | "revokeRole"
      | "sell"
      | "setDepositAddress"
      | "setFeeOwner"
      | "setMarketSpread"
      | "setMinDeposit"
      | "setMinWithdrawal"
      | "supportsInterface"
      | "tokenPrice"
      | "totalAmountToLiquidate"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "collectDeposits",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "feeOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "investmentState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "liquidate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "liquidationState",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "marketSpread",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minDeposit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minWithdrawal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintPendingInvestments",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "prepareLiquidations",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "sell", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "setDepositAddress",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setFeeOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setMarketSpread",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinDeposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinWithdrawal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalAmountToLiquidate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "investmentState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "liquidate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "liquidationState",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "marketSpread",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "minDeposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintPendingInvestments",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "prepareLiquidations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDepositAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMarketSpread",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinDeposit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinWithdrawal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalAmountToLiquidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "DepositsCollected(uint256)": EventFragment;
    "LiquidationsPrepared(uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "TokenMinted(uint256)": EventFragment;
    "TokenPurchaseRequested(address,uint256)": EventFragment;
    "TokenSaleRequested(address,uint256)": EventFragment;
    "TokensLiquidated(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DepositsCollected"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidationsPrepared"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenMinted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenPurchaseRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenSaleRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensLiquidated"): EventFragment;
}

export interface DepositsCollectedEventObject {
  totalValue: BigNumber;
}
export type DepositsCollectedEvent = TypedEvent<
  [BigNumber],
  DepositsCollectedEventObject
>;

export type DepositsCollectedEventFilter =
  TypedEventFilter<DepositsCollectedEvent>;

export interface LiquidationsPreparedEventObject {
  totalValue: BigNumber;
}
export type LiquidationsPreparedEvent = TypedEvent<
  [BigNumber],
  LiquidationsPreparedEventObject
>;

export type LiquidationsPreparedEventFilter =
  TypedEventFilter<LiquidationsPreparedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface TokenMintedEventObject {
  entryPrice: BigNumber;
}
export type TokenMintedEvent = TypedEvent<[BigNumber], TokenMintedEventObject>;

export type TokenMintedEventFilter = TypedEventFilter<TokenMintedEvent>;

export interface TokenPurchaseRequestedEventObject {
  from: string;
  value: BigNumber;
}
export type TokenPurchaseRequestedEvent = TypedEvent<
  [string, BigNumber],
  TokenPurchaseRequestedEventObject
>;

export type TokenPurchaseRequestedEventFilter =
  TypedEventFilter<TokenPurchaseRequestedEvent>;

export interface TokenSaleRequestedEventObject {
  from: string;
  value: BigNumber;
}
export type TokenSaleRequestedEvent = TypedEvent<
  [string, BigNumber],
  TokenSaleRequestedEventObject
>;

export type TokenSaleRequestedEventFilter =
  TypedEventFilter<TokenSaleRequestedEvent>;

export interface TokensLiquidatedEventObject {
  exitPrice: BigNumber;
}
export type TokensLiquidatedEvent = TypedEvent<
  [BigNumber],
  TokensLiquidatedEventObject
>;

export type TokensLiquidatedEventFilter =
  TypedEventFilter<TokensLiquidatedEvent>;

export interface CustodialMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CustodialMarketInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    collectDeposits(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositAddress(overrides?: CallOverrides): Promise<[string]>;

    feeOwner(overrides?: CallOverrides): Promise<[string]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    investmentState(overrides?: CallOverrides): Promise<[number]>;

    liquidate(
      _exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    liquidationState(overrides?: CallOverrides): Promise<[number]>;

    marketSpread(overrides?: CallOverrides): Promise<[BigNumber]>;

    minDeposit(overrides?: CallOverrides): Promise<[BigNumber]>;

    minWithdrawal(overrides?: CallOverrides): Promise<[BigNumber]>;

    mintPendingInvestments(
      _tokenEntryPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    prepareLiquidations(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sell(
      _amountToSell: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDepositAddress(
      _depositAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeOwner(
      _feeOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMarketSpread(
      _marketSpread: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinDeposit(
      _minDeposit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMinWithdrawal(
      _minWithdrawal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    tokenPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalAmountToLiquidate(overrides?: CallOverrides): Promise<[BigNumber]>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  buy(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  collectDeposits(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositAddress(overrides?: CallOverrides): Promise<string>;

  feeOwner(overrides?: CallOverrides): Promise<string>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  investmentState(overrides?: CallOverrides): Promise<number>;

  liquidate(
    _exitPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  liquidationState(overrides?: CallOverrides): Promise<number>;

  marketSpread(overrides?: CallOverrides): Promise<BigNumber>;

  minDeposit(overrides?: CallOverrides): Promise<BigNumber>;

  minWithdrawal(overrides?: CallOverrides): Promise<BigNumber>;

  mintPendingInvestments(
    _tokenEntryPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  prepareLiquidations(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sell(
    _amountToSell: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDepositAddress(
    _depositAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeOwner(
    _feeOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMarketSpread(
    _marketSpread: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinDeposit(
    _minDeposit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMinWithdrawal(
    _minWithdrawal: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

  totalAmountToLiquidate(overrides?: CallOverrides): Promise<BigNumber>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    buy(overrides?: CallOverrides): Promise<void>;

    collectDeposits(overrides?: CallOverrides): Promise<void>;

    depositAddress(overrides?: CallOverrides): Promise<string>;

    feeOwner(overrides?: CallOverrides): Promise<string>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    investmentState(overrides?: CallOverrides): Promise<number>;

    liquidate(
      _exitPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    liquidationState(overrides?: CallOverrides): Promise<number>;

    marketSpread(overrides?: CallOverrides): Promise<BigNumber>;

    minDeposit(overrides?: CallOverrides): Promise<BigNumber>;

    minWithdrawal(overrides?: CallOverrides): Promise<BigNumber>;

    mintPendingInvestments(
      _tokenEntryPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    prepareLiquidations(overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    sell(_amountToSell: BigNumberish, overrides?: CallOverrides): Promise<void>;

    setDepositAddress(
      _depositAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setFeeOwner(_feeOwner: string, overrides?: CallOverrides): Promise<void>;

    setMarketSpread(
      _marketSpread: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinDeposit(
      _minDeposit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinWithdrawal(
      _minWithdrawal: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    totalAmountToLiquidate(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "DepositsCollected(uint256)"(
      totalValue?: null
    ): DepositsCollectedEventFilter;
    DepositsCollected(totalValue?: null): DepositsCollectedEventFilter;

    "LiquidationsPrepared(uint256)"(
      totalValue?: null
    ): LiquidationsPreparedEventFilter;
    LiquidationsPrepared(totalValue?: null): LiquidationsPreparedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "TokenMinted(uint256)"(entryPrice?: null): TokenMintedEventFilter;
    TokenMinted(entryPrice?: null): TokenMintedEventFilter;

    "TokenPurchaseRequested(address,uint256)"(
      from?: string | null,
      value?: null
    ): TokenPurchaseRequestedEventFilter;
    TokenPurchaseRequested(
      from?: string | null,
      value?: null
    ): TokenPurchaseRequestedEventFilter;

    "TokenSaleRequested(address,uint256)"(
      from?: string | null,
      value?: null
    ): TokenSaleRequestedEventFilter;
    TokenSaleRequested(
      from?: string | null,
      value?: null
    ): TokenSaleRequestedEventFilter;

    "TokensLiquidated(uint256)"(exitPrice?: null): TokensLiquidatedEventFilter;
    TokensLiquidated(exitPrice?: null): TokensLiquidatedEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    collectDeposits(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositAddress(overrides?: CallOverrides): Promise<BigNumber>;

    feeOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    investmentState(overrides?: CallOverrides): Promise<BigNumber>;

    liquidate(
      _exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    liquidationState(overrides?: CallOverrides): Promise<BigNumber>;

    marketSpread(overrides?: CallOverrides): Promise<BigNumber>;

    minDeposit(overrides?: CallOverrides): Promise<BigNumber>;

    minWithdrawal(overrides?: CallOverrides): Promise<BigNumber>;

    mintPendingInvestments(
      _tokenEntryPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    prepareLiquidations(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sell(
      _amountToSell: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDepositAddress(
      _depositAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeOwner(
      _feeOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMarketSpread(
      _marketSpread: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinDeposit(
      _minDeposit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMinWithdrawal(
      _minWithdrawal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenPrice(overrides?: CallOverrides): Promise<BigNumber>;

    totalAmountToLiquidate(overrides?: CallOverrides): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    collectDeposits(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    investmentState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    liquidate(
      _exitPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    liquidationState(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    marketSpread(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minDeposit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minWithdrawal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintPendingInvestments(
      _tokenEntryPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    prepareLiquidations(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sell(
      _amountToSell: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDepositAddress(
      _depositAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeOwner(
      _feeOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMarketSpread(
      _marketSpread: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinDeposit(
      _minDeposit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMinWithdrawal(
      _minWithdrawal: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalAmountToLiquidate(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}