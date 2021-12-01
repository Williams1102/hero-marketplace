//import { Interface } from "@ethersproject/abi";
import { networkChainId } from './network'
import MARKETPLACE_ABI from './abis/Marketplace.json'
import MARKETPLACE_ABI_MAIN from './abis/MarketplaceMain.json'

const MAINNET_POLYGON_KABY_MARKET = ''
const TESTNET_POLYGON_KABY_MARKET = ''

const MAINNET_BSC_KABY_MARKET = ''
const TESTNET_BSC_KABY_MARKET = '0xAE655450B4EF8F9d25dB8E29A6f35D6729656Aa9'

const NetWork = {
  [networkChainId.bscMainnet]: MARKETPLACE_ABI_MAIN,
  [networkChainId.polygonMainnet]: MARKETPLACE_ABI_MAIN,
  [networkChainId.bscTestnet]: MARKETPLACE_ABI,
  [networkChainId.polygonTestnet]: MARKETPLACE_ABI,
}

export const getKabyMarketABI = (chainId) => {
  return { MARKETPLACE_ABI: NetWork[chainId] }
}

const MARKETPLACE_ADDRESS = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_KABY_MARKET, //POLYGON
  [networkChainId.bscTestnet]: TESTNET_BSC_KABY_MARKET, // BSC

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_KABY_MARKET, // Polygon
  [networkChainId.bscMainnet]: MAINNET_BSC_KABY_MARKET, //BSC
}

export function getKabyMarketAddress(chainId) {
  return MARKETPLACE_ADDRESS[chainId]
}
