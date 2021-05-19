import { ChainId, SHA3_Query, Token, TokenAmount } from "../query/w3";
import { ETHER } from "./Currency";
import { currencyEquals } from "../query";

export function compareAddresses(ref: string, other: string): i32 {
  const n: i32 = ref.length < other.length ? ref.length : other.length;
  for (let i = 0; i < n; i++) {
    if (ref.charAt(i) < other.charAt(i)) return -1;
    if (ref.charAt(i) > other.charAt(i)) return 1;
  }
  return ref.length - other.length;
}

// TODO: Waiting to delete this in case we are eventually able to make calls by chain id.
export function resolveChainId(chainId: ChainId): string {
  switch (chainId) {
    case ChainId.MAINNET:
      return "1";
    case ChainId.ROPSTEN:
      return "3";
    case ChainId.RINKEBY:
      return "4";
    case ChainId.GOERLI:
      return "5";
    case ChainId.KOVAN:
      return "42";
    default:
      throw new Error("Unknown chain ID. This should never happen.");
  }
}

export function getWETH9(chainId: ChainId): Token {
  switch (chainId) {
    case ChainId.MAINNET:
      return {
        chainId: ChainId.MAINNET,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether",
        },
      };
    case ChainId.ROPSTEN:
      return {
        chainId: ChainId.ROPSTEN,
        address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether",
        },
      };
    case ChainId.RINKEBY:
      return {
        chainId: ChainId.RINKEBY,
        address: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether",
        },
      };
    case ChainId.GOERLI:
      return {
        chainId: ChainId.GOERLI,
        address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether",
        },
      };
    case ChainId.KOVAN:
      return {
        chainId: ChainId.KOVAN,
        address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether",
        },
      };
    default:
      throw new Error("Unknown chain ID. This should never happen.");
  }
}

// check if need to wrap ether
export function wrapIfEther(token: Token): Token {
  if (
    currencyEquals({ currency: token.currency, other: ETHER }) &&
    token.address == ""
  ) {
    return getWETH9(token.chainId);
  }
  return token;
}

export function copyToken(token: Token): Token {
  return {
    chainId: token.chainId,
    address: token.address,
    currency: {
      name: token.currency.name,
      symbol: token.currency.symbol,
      decimals: token.currency.decimals,
    },
  };
}

export function copyTokenAmount(tokenAmount: TokenAmount): TokenAmount {
  return {
    token: copyToken(tokenAmount.token),
    amount: tokenAmount.amount,
  };
}

// https://eips.ethereum.org/EIPS/eip-1014
// https://github.com/ethers-io/ethers.js/blob/master/packages/address/src.ts/index.ts#L143
// https://github.com/ethers-io/ethers.js/blob/master/packages/bytes/src.ts/index.ts
// https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol#L32
// https://uniswap.org/docs/v2/javascript-SDK/getting-pair-addresses/

// export function getChecksumAddress(address: string): string {
//   if (address.startsWith("0x")) {
//     address.substring(2);
//   }
//   address = address.toLowerCase();
//   const chars: string[] = address.split("");
//
//   const expanded: Uint8Array = new Uint8Array(40);
//   for (let i = 0; i < 40; i++) {
//     expanded[i] = chars[i].charCodeAt(0);
//   }
//
//   const hashed: string = SHA3_Query.keccak_256({ message: expanded.join("") });
//   const hashedArr: Uint8Array = arrayify(hashed);
//   for (let i = 0; i < 40; i += 2) {
//     if (hashedArr[i >> 1] >> 4 >= 8) {
//       chars[i] = chars[i].toUpperCase();
//     }
//     if ((hashedArr[i >> 1] & 0x0f) >= 8) {
//       chars[i + 1] = chars[i + 1].toUpperCase();
//     }
//   }
//
//   return "0x" + chars.join("");
// }
//
// function arrayify(value: string): Uint8Array {
//   const hex = value.substring(2);
//   const result: Uint8Array = new Uint8Array(value.length / 2);
//   let j: u32 = 0;
//   for (let i = 0; i < hex.length; i += 2) {
//     result[j] = U8.parseInt(hex.substring(i, i + 2), 16);
//     j++;
//   }
//   return result;
// }
