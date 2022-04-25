/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CustodialMarket,
  CustodialMarketInterface,
} from "../../contracts/CustodialMarket";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
    ],
    name: "DepositsCollected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
    ],
    name: "LiquidationsPrepared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "entryPrice",
        type: "uint256",
      },
    ],
    name: "TokenMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TokenPurchaseRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TokenSaleRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "exitPrice",
        type: "uint256",
      },
    ],
    name: "TokensLiquidated",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "collectDeposits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInvestorsState",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "investmentState",
    outputs: [
      {
        internalType: "enum CustodialMarket.InvestmentStates",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "investors",
    outputs: [
      {
        internalType: "uint256",
        name: "deposits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pendingInvestments",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokensToSell",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pendingLiquidations",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "pendingWithdrawals",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_exitPrice",
        type: "uint256",
      },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "liquidationState",
    outputs: [
      {
        internalType: "enum CustodialMarket.LiquidationStates",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketSpread",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minWithdrawal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenEntryPrice",
        type: "uint256",
      },
    ],
    name: "mintPendingInvestments",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "prepareLiquidations",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountToSell",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositAddress",
        type: "address",
      },
    ],
    name: "setDepositAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeOwner",
        type: "address",
      },
    ],
    name: "setFeeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_marketSpread",
        type: "uint256",
      },
    ],
    name: "setMarketSpread",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minDeposit",
        type: "uint256",
      },
    ],
    name: "setMinDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minWithdrawal",
        type: "uint256",
      },
    ],
    name: "setMinWithdrawal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAmountToLiquidate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040526001805461ffff1916905534801561001b57600080fd5b506114a58061002b6000396000f3fe6080604052600436106101d15760003560e01c80637ddf15e5116100f7578063b070e43311610095578063d547741f11610064578063d547741f146105a0578063e4849b32146105c0578063eeb5f21f146105de578063f9abb1f1146105fe57600080fd5b8063b070e43314610514578063b1f5e9e714610534578063b9818be114610560578063cf83fe4b1461058657600080fd5b806391d14854116100d157806391d1485414610493578063a217fddf146104d7578063a6f2ae3a146104ec578063ab18af27146104f457600080fd5b80637ddf15e5146104485780637ff9b5961461045d5780638fcc9cfb1461047357600080fd5b806336568abe1161016f5780634b104eff1161013e5780634b104eff146103675780634cc587e81461038757806356e22d0f146103c05780636f7bc9be146103d557600080fd5b806336568abe146102fc5780633ccfd60b1461031c578063415f12401461033157806341b3d1851461035157600080fd5b8063248a9ca3116101ab578063248a9ca31461025457806328f833b7146102845780632e0c8c5e146102bc5780632f2ff15d146102dc57600080fd5b806301ffc9a7146101e557806308ca65cf1461021a57806314a034b61461023e57600080fd5b366101e0576101de610614565b005b600080fd5b3480156101f157600080fd5b506102056102003660046111e8565b610782565b60405190151581526020015b60405180910390f35b34801561022657600080fd5b5061023060035481565b604051908152602001610211565b34801561024a57600080fd5b50610230600c5481565b34801561026057600080fd5b5061023061026f366004611212565b60009081526020819052604090206001015490565b34801561029057600080fd5b506002546102a4906001600160a01b031681565b6040516001600160a01b039091168152602001610211565b3480156102c857600080fd5b506101de6102d7366004611212565b6107b9565b3480156102e857600080fd5b506101de6102f7366004611247565b6107cb565b34801561030857600080fd5b506101de610317366004611247565b6107f6565b34801561032857600080fd5b506101de610882565b34801561033d57600080fd5b506101de61034c366004611212565b6108c8565b34801561035d57600080fd5b50610230600a5481565b34801561037357600080fd5b506101de610382366004611273565b610940565b34801561039357600080fd5b50600554600654600754600854604080519485526020850193909352918301526060820152608001610211565b3480156103cc57600080fd5b506101de61098d565b3480156103e157600080fd5b506104206103f0366004611273565b60046020819052600091825260409091208054600182015460028301546003840154939094015491939092909185565b604080519586526020860194909452928401919091526060830152608082015260a001610211565b34801561045457600080fd5b506101de610bb6565b34801561046957600080fd5b5061023060095481565b34801561047f57600080fd5b506101de61048e366004611212565b610db1565b34801561049f57600080fd5b506102056104ae366004611247565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156104e357600080fd5b50610230600081565b6101de610614565b34801561050057600080fd5b506101de61050f366004611273565b610dc3565b34801561052057600080fd5b506101de61052f366004611212565b610df2565b34801561054057600080fd5b5060015461055390610100900460ff1681565b60405161021191906112c2565b34801561056c57600080fd5b506001546102a4906201000090046001600160a01b031681565b34801561059257600080fd5b506001546105539060ff1681565b3480156105ac57600080fd5b506101de6105bb366004611247565b610e04565b3480156105cc57600080fd5b506101de6105db366004611212565b50565b3480156105ea57600080fd5b506101de6105f9366004611212565b610e2a565b34801561060a57600080fd5b50610230600b5481565b600a5434101561066b5760405162461bcd60e51b815260206004820152601260248201527f4e6f7420656e6f756768206465706f736974000000000000000000000000000060448201526064015b60405180910390fd5b6000621e84806003543461067f91906112eb565b610689919061130a565b33600090815260046020526040812054919250036106e457600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b031916331790555b6106ee813461132c565b336000908152600460205260408120805490919061070d908490611343565b90915550506001546201000090046001600160a01b031660009081526004602081905260408220018054839290610745908490611343565b909155505060405134815233907fea9f1cfffdc9bccecc3cf6bb3eccc40a6979cd4dda52722af70e4fe4e02289d49060200160405180910390a250565b60006001600160e01b03198216637965db0b60e01b14806107b357506301ffc9a760e01b6001600160e01b03198316145b92915050565b60006107c58133610e9d565b50600355565b6000828152602081905260409020600101546107e78133610e9d565b6107f18383610f1b565b505050565b6001600160a01b03811633146108745760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610662565b61087e8282610fb9565b5050565b336000818152600460208190526040808320909101805490839055905190929183156108fc02918491818181858888f1935050505015801561087e573d6000803e3d6000fd5b60006108d48133610e9d565b60018060018054610100900460ff16908111156108f3576108f361128e565b146107f15760405162461bcd60e51b815260206004820152601960248201527f696e76616c6964206c69717569646174696f6e207374617465000000000000006044820152606401610662565b600061094c8133610e9d565b50600180546001600160a01b0390921662010000027fffffffffffffffffffff0000000000000000000000000000000000000000ffff909216919091179055565b60006109998133610e9d565b6000806001805460ff16908111156109b3576109b361128e565b14610a005760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420696e766573746d656e7420737461746500000000000000006044820152606401610662565b6005546000905b8015610b355760006005610a1c60018461132c565b81548110610a2c57610a2c61135b565b60009182526020808320909101546001600160a01b03168083526004909152604090912054909150610a5e9084611343565b6001600160a01b03821660009081526004602052604081208054600190910180549396509092909190610a92908490611343565b909155505060068054600181019091557ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0180546001600160a01b0319166001600160a01b0383169081179091556000908152600460205260408120556005805480610b0057610b00611371565b600082815260209020810160001990810180546001600160a01b03191690550190555080610b2d81611387565b915050610a07565b506001805460ff1916811790556002546040516001600160a01b03909116906108fc8315029083906000818181858888f19350505050158015610b7c573d6000803e3d6000fd5b506040518181527f04a1b64716e70bcc36c95ec08912968743f78fd1e4026d8d712eba059581d92b906020015b60405180910390a1505050565b6000610bc28133610e9d565b60008060018054610100900460ff1690811115610be157610be161128e565b14610c2e5760405162461bcd60e51b815260206004820152601960248201527f696e76616c6964206c69717569646174696f6e207374617465000000000000006044820152606401610662565b6007546000905b8015610d6c5760006007610c4a60018461132c565b81548110610c5a57610c5a61135b565b60009182526020808320909101546001600160a01b03168083526004909152604090912060020154909150610c8f9084611343565b6001600160a01b03821660009081526004602052604081206002810154600390910180549396509092909190610cc6908490611343565b909155505060088054600181019091557ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30180546001600160a01b0319166001600160a01b0383169081179091556000908152600460205260408120600201556007805480610d3757610d37611371565b600082815260209020810160001990810180546001600160a01b03191690550190555080610d6481611387565b915050610c35565b506001805461ff001916610100179055600c8190556040518181527f84242042fa9d366d98e0adaf4a2ad97c204db1be9c47a2d7939cea47c3be794e90602001610ba9565b6000610dbd8133610e9d565b50600a55565b6000610dcf8133610e9d565b50600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000610dfe8133610e9d565b50600b55565b600082815260208190526040902060010154610e208133610e9d565b6107f18383610fb9565b6000610e368133610e9d565b6001806001805460ff1690811115610e5057610e5061128e565b146107f15760405162461bcd60e51b815260206004820152601860248201527f696e76616c696420696e766573746d656e7420737461746500000000000000006044820152606401610662565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1661087e57610ed9816001600160a01b03166014611038565b610ee4836020611038565b604051602001610ef59291906113ce565b60408051601f198184030181529082905262461bcd60e51b82526106629160040161144f565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1661087e576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610f753390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff161561087e576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b606060006110478360026112eb565b611052906002611343565b67ffffffffffffffff81111561106a5761106a611482565b6040519080825280601f01601f191660200182016040528015611094576020820181803683370190505b509050600360fc1b816000815181106110af576110af61135b565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106110de576110de61135b565b60200101906001600160f81b031916908160001a90535060006111028460026112eb565b61110d906001611343565b90505b6001811115611192577f303132333435363738396162636465660000000000000000000000000000000085600f166010811061114e5761114e61135b565b1a60f81b8282815181106111645761116461135b565b60200101906001600160f81b031916908160001a90535060049490941c9361118b81611387565b9050611110565b5083156111e15760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610662565b9392505050565b6000602082840312156111fa57600080fd5b81356001600160e01b0319811681146111e157600080fd5b60006020828403121561122457600080fd5b5035919050565b80356001600160a01b038116811461124257600080fd5b919050565b6000806040838503121561125a57600080fd5b8235915061126a6020840161122b565b90509250929050565b60006020828403121561128557600080fd5b6111e18261122b565b634e487b7160e01b600052602160045260246000fd5b600281106105db57634e487b7160e01b600052602160045260246000fd5b602081016112cf836112a4565b91905290565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615611305576113056112d5565b500290565b60008261132757634e487b7160e01b600052601260045260246000fd5b500490565b60008282101561133e5761133e6112d5565b500390565b60008219821115611356576113566112d5565b500190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b600081611396576113966112d5565b506000190190565b60005b838110156113b95781810151838201526020016113a1565b838111156113c8576000848401525b50505050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161140681601785016020880161139e565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161144381602884016020880161139e565b01602801949350505050565b602081526000825180602084015261146e81604085016020870161139e565b601f01601f19169190910160400192915050565b634e487b7160e01b600052604160045260246000fdfea164736f6c634300080d000a";

type CustodialMarketConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CustodialMarketConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CustodialMarket__factory extends ContractFactory {
  constructor(...args: CustodialMarketConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CustodialMarket> {
    return super.deploy(overrides || {}) as Promise<CustodialMarket>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CustodialMarket {
    return super.attach(address) as CustodialMarket;
  }
  override connect(signer: Signer): CustodialMarket__factory {
    return super.connect(signer) as CustodialMarket__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CustodialMarketInterface {
    return new utils.Interface(_abi) as CustodialMarketInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CustodialMarket {
    return new Contract(address, _abi, signerOrProvider) as CustodialMarket;
  }
}
