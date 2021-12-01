//import { Interface } from "@ethersproject/abi";
import KABY_TOKEN_ABI from './abis/kabyToken.json'
import KABY_TOKEN_ABI_MAIN from './abis/kabyTokenMain.json'
import { networkChainId } from './network'

const MAINNET_POLYGON_KABY_TOKEN = ''
const TESTNET_POLYGON_KABY_TOKEN = ''

const MAINNET_BSC_KABY_TOKEN = ''
const TESTNET_BSC_KABY_TOKEN = '0xdC9F8f9eBC3e6B6081A5F721f382DdfeF19A3F77'

const NetWork = {
  [networkChainId.bscMainnet]: KABY_TOKEN_ABI_MAIN,
  [networkChainId.polygonMainnet]: KABY_TOKEN_ABI_MAIN,
  [networkChainId.bscTestnet]: KABY_TOKEN_ABI,
  [networkChainId.polygonTestnet]: KABY_TOKEN_ABI,
}

export const getKabyTokenABI = (chainId) => {
  return { KABY_TOKEN_ABI: NetWork[chainId] }
}

const KABY_TOKEN_ADDRESS = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_KABY_TOKEN, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_KABY_TOKEN, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_KABY_TOKEN, // Polygon Mainnet
  [networkChainId.bscMainnet]: MAINNET_BSC_KABY_TOKEN, //BSC Mainnet
}

export function getKabyTokenAddress(chainId) {
  return KABY_TOKEN_ADDRESS[chainId]
}
