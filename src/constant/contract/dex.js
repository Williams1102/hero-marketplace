//import { Interface } from "@ethersproject/abi";
import DEX_ABI from './abis/dex.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_DEX = null
const MAINNET_BSC_DEX = '0x10ED43C718714eb63d5aA57B78B54704E256024E'

// only test network
const TESTNET_POLYGON_DEX = null
const TESTNET_BSC_DEX = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'

// only main network
const MAINNET_POLYGON_USD = null
const MAINNET_BSC_USD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

// only test network
const TESTNET_POLYGON_USD = null
const TESTNET_BSC_USD = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'

const NetWork = {
  [networkChainId.bscMainnet]: DEX_ABI,
  [networkChainId.polygonMainnet]: DEX_ABI,
  [networkChainId.bscTestnet]: DEX_ABI,
  [networkChainId.polygonTestnet]: DEX_ABI,
}

export const getDexABI = (chainId) => {
  return {
    DEX_ABI: NetWork[chainId],
  }
}

const DEX = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_DEX, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_DEX, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_DEX, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_DEX, //BSC Mainnet
}

export function getDexAddress(chainId) {
  return DEX[chainId]
}

const BUSD = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_USD, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_USD, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_USD, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_USD, //BSC Mainnet
}

export function getUSDAddress(chainId) {
  return BUSD[chainId]
}
