import { networkChainId } from './network'
import HERO_ABI from './abis/hero.json'
import HERO_ABI_MAIN from './abis/heroMain.json'
import AIRDROP_ABI from './abis/airdropHero.json'
import AIRDROP_ABI_MAIN from './abis/airdropHeroMain.json'

const MAINNET_POLYGON_KABY_HERO = ''
const MAINNET_BSC_KABY_HERO = ''

const TESTNET_POLYGON_KABY_HERO = ''
const TESTNET_BSC_KABY_HERO = '0xaC8B09BF2b7185F3057d97208C544A6E91F8D636'

//=====================AIRDROP HERO=============================
const MAINNET_POLYGON_AIRDROP_HERO = '0xe0524698606dA087fd40E9ed633B3fA945DAAF80'
const MAINNET_BSC_AIRDROP_HERO = '0x139F711D771573387b076b351069c2aA97098AdD'

const TESTNET_POLYGON_AIRDROP_HERO = '0xFDa6CC713984F048df9c8AE0c76A27d5F0166E81'
const TESTNET_BSC_AIRDROP_HERO = '0x1EdaDe00a6DaA4341726A67BbCBC5B6C86ec5695'

const AirdropHeroAddress = {
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_AIRDROP_HERO,
  [networkChainId.bscMainnet]: MAINNET_BSC_AIRDROP_HERO,

  [networkChainId.polygonTestnet]: TESTNET_POLYGON_AIRDROP_HERO,
  [networkChainId.bscTestnet]: TESTNET_BSC_AIRDROP_HERO,
}

export function getAirdropHeroAddress(chainId) {
  return AirdropHeroAddress[chainId]
}

const NetWorkAirdrop = {
  [networkChainId.bscMainnet]: AIRDROP_ABI_MAIN,
  [networkChainId.polygonMainnet]: AIRDROP_ABI_MAIN,
  [networkChainId.bscTestnet]: AIRDROP_ABI,
  [networkChainId.polygonTestnet]: AIRDROP_ABI,
}
export const getAirdropHeroABI = (chainId) => {
  return { AIRDROP_ABI: NetWorkAirdrop[chainId] }
}

const HeroAddress = {
  /** OLD HERO MAINNET  */
  [networkChainId.polygonMainnet]: MAINNET_POLYGON_KABY_HERO,
  [networkChainId.bscMainnet]: MAINNET_BSC_KABY_HERO,

  /** OLD HERO TESTNET  */
  [networkChainId.polygonTestnet]: TESTNET_POLYGON_KABY_HERO,
  [networkChainId.bscTestnet]: TESTNET_BSC_KABY_HERO,
}

export function getKabyHeroAddress(chainId) {
  return HeroAddress[chainId]
}

const NetWork = {
  [networkChainId.bscMainnet]: HERO_ABI_MAIN,
  [networkChainId.polygonMainnet]: HERO_ABI_MAIN,
  [networkChainId.bscTestnet]: HERO_ABI,
  [networkChainId.polygonTestnet]: HERO_ABI,
}
export const getHeroABI = (chainId) => {
  return { HERO_ABI: NetWork[chainId] }
}
