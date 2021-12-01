import SUMMON_STAKING_POOL_ABI from './abis/summonStakingPool.json'
import SUMMON_STAKING_POOL_ABI_MAIN from './abis/summonStakingPoolMain.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_SUMMON_STAKING = '0x755eA805cC2e36CEf4C0643198DBDe22285C201D'
const MAINNET_BSC_SUMMON_STAKING = '0xA7d5D00737FE08431263152CbED7C5Aa3c73e7C3'

// only test network
const TESTNET_POLYGON_SUMMON_STAKING = '0xe01BD70667F93512C030be6f2832AD58298045Bb'
const TESTNET_BSC_SUMMON_STAKING = '0xA637018Cb07B7d5b78e67c0A6502d35dBae938bd'

const NetWork = {
  [networkChainId.bscMainnet]: SUMMON_STAKING_POOL_ABI_MAIN,
  [networkChainId.polygonMainnet]: SUMMON_STAKING_POOL_ABI_MAIN,
  [networkChainId.bscTestnet]: SUMMON_STAKING_POOL_ABI,
  [networkChainId.polygonTestnet]: SUMMON_STAKING_POOL_ABI,
}

export const getSummonStakingPoolABI = (chainId) => {
  return {
    SUMMON_STAKING_POOL_ABI: NetWork[chainId],
  }
}

const SUMMON_STAKING = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_SUMMON_STAKING, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_SUMMON_STAKING, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_SUMMON_STAKING, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_SUMMON_STAKING, //BSC Mainnet
}

export function getSummonStakingAddress(chainId) {
  return SUMMON_STAKING[chainId]
}
