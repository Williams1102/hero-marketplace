//import { Interface } from "@ethersproject/abi";
import UPGRADE_STAR_ABI from './abis/upgradeStartHero.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_UPGRADE_STAR = '0xFCFbb770FbC968754f697AF22b16a4077b485302'
const MAINNET_BSC_UPGRADE_STAR = '0xA2d6e8FF32670671A3Febeb0a547679CC834eC5F'

// only test network
const TESTNET_POLYGON_UPGRADE_STAR = '0x8de3b27bFD60Ae162af1EFec37a79BbE479600B2'
const TESTNET_BSC_FARM_UPGRADE_STAR = '0xf736dA3c6201669b00266C9120559749FF98DbB2'

const NetWork = {
  [networkChainId.bscMainnet]: UPGRADE_STAR_ABI,
  [networkChainId.polygonMainnet]: UPGRADE_STAR_ABI,
  [networkChainId.bscTestnet]: UPGRADE_STAR_ABI,
  [networkChainId.polygonTestnet]: UPGRADE_STAR_ABI,
}

export const getUpgradeStarABI = (chainId) => {
  return {
    UPGRADE_START_ABI: NetWork[chainId],
  }
}

const UPGRADE_START = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_UPGRADE_STAR, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_FARM_UPGRADE_STAR, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_UPGRADE_STAR, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_UPGRADE_STAR, //BSC Mainnet
}

export function getUpgradeStarAddress(chainId) {
  return UPGRADE_START[chainId]
}
