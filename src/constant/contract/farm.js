//import { Interface } from "@ethersproject/abi";
import FARM_ABI from './abis/farm.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_FARM_KGT = null
const MAINNET_BSC_FARM_KGT = '0x9B9CF735DED7E58638c4BDeFCa4D9A11836516bC'

// only test network
const TESTNET_POLYGON_FARM_KGT = null
const TESTNET_BSC_FARM_KGT = '0xA446838c6Bd48494003Ac4c5099318F16AC6f3Dd'

// only main network
const MAINNET_POLYGON_FARM_KABY = null
const MAINNET_BSC_FARM_KABY = ''

// only test network
const TESTNET_POLYGON_FARM_KABY = null
const TESTNET_BSC_FARM_KABY = '0xD442B97C84dF77951BB270Da7B9854Eaa08Cb498'

const NetWork = {
  [networkChainId.bscMainnet]: FARM_ABI,
  [networkChainId.polygonMainnet]: FARM_ABI,
  [networkChainId.bscTestnet]: FARM_ABI,
  [networkChainId.polygonTestnet]: FARM_ABI,
}

export const getFarmABI = (chainId) => {
  return {
    FARM_ABI: NetWork[chainId],
  }
}

const STAKING_POOL_KGT = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_FARM_KGT, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_FARM_KGT, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_FARM_KGT, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_FARM_KGT, //BSC Mainnet
}

const STAKING_POOL_KABY = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_FARM_KABY, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_FARM_KABY, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_FARM_KABY, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_FARM_KABY, //BSC Mainnet
}

export function getFarmKabyAddress(chainId) {
  return STAKING_POOL_KABY[chainId]
}

export function getFarmKGTAddress(chainId) {
  return STAKING_POOL_KGT[chainId]
}
