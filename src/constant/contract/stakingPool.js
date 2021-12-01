//import { Interface } from "@ethersproject/abi";
import STAKING_POOL_ABI from './abis/stakingPool.json'
import STAKING_POOL_ABI_MAIN from './abis/stakingPoolMain.json'
import { networkChainId } from './network'

// only main network
const MAINNET_POLYGON_STAKING_POOL = '0xf456E86e8609c7B6C2B710e244A8bfE99C9c5A19'
const MAINNET_BSC_STAKING_POOL = '0x7411ec6452361478a7C16f694806174433B2157c'

// only test network
const TESTNET_POLYGON_STAKING_POOL = '0x88b0CCEc49246C67f1ACebc52A1E2c35b92A261D'
const TESTNET_BSC_STAKING_POOL = '0xc2b639054BcF35389751d620bb8c5eF2F73C313A'

const NetWork = {
  [networkChainId.bscMainnet]: STAKING_POOL_ABI_MAIN,
  [networkChainId.polygonMainnet]: STAKING_POOL_ABI_MAIN,
  [networkChainId.bscTestnet]: STAKING_POOL_ABI,
  [networkChainId.polygonTestnet]: STAKING_POOL_ABI,
}

export const getStakingPoolABI = (chainId) => {
  return {
    STAKING_POOL_ABI: NetWork[chainId],
  }
}

const STAKING_POOL = {
  /** TESTNET */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_STAKING_POOL, // Polygon Testnet
  [networkChainId.bscTestnet]: TESTNET_BSC_STAKING_POOL, // BSC testnet

  /** MAINNET */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_STAKING_POOL, // Polygon Mainnet,
  [networkChainId.bscMainnet]: MAINNET_BSC_STAKING_POOL, //BSC Mainnet
}

export function getStakingPoolAddress(chainId) {
  return STAKING_POOL[chainId]
}
