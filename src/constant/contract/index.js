import { networkChainId } from './network'
import { SupportedNetwork } from 'constant/connector'
export * from './marketplace'
export * from './heroes'
export * from './kabyToken'
export * from './summonStakingPool'
export * from './stakingPool'
export * from './farm'
export * from './dex'
export * from './kabyGameToken'
export * from './upgradeStarHero'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export function checkSupportedNetwork(chainId) {
  return SupportedNetwork.includes(chainId)
}

export const networkIdAPI = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: 0, //POLYGON
  [networkChainId.bscTestnet]: 1, // BSC

  /** MAINNET */
  [networkChainId.polygonMainnet]: 0, // Polygon
  [networkChainId.bscMainnet]: 1, //BSC
}
