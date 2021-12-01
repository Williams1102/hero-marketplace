//import { Interface } from "@ethersproject/abi";
import TOKEN_ABI from './abis/token.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_KABY_GAME_TOKEN = ''
const MAINNET_BSC_KABY_GAME_TOKEN = '0xA4E208c627f3aDc60165C2a9fE79D73F4e8DD760'

// only test network
const TESTNET_POLYGON_KABY_GAME_TOKEN = ''
const TESTNET_BSC_KABY_GAME_TOKEN = '0x1aF03581f89f32A319665E4B4b227ed274866617'

const NetWork = {
  [networkChainId.bscMainnet]: TOKEN_ABI,
  [networkChainId.polygonMainnet]: TOKEN_ABI,
  [networkChainId.bscTestnet]: TOKEN_ABI,
  [networkChainId.polygonTestnet]: TOKEN_ABI,
}

export const getKabyGameTokenABI = (chainId) => {
  return {
    KABY_GAME_TOKEN_ABI: NetWork[chainId],
  }
}

const KABY_GAME_TOKEN = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_KABY_GAME_TOKEN, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_KABY_GAME_TOKEN, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_KABY_GAME_TOKEN, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_KABY_GAME_TOKEN, //BSC Mainnet
}

export function getKabyGameTokenAddress(chainId) {
  return KABY_GAME_TOKEN[chainId]
}
