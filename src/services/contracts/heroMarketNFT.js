import { getInfoWallet } from './wallet'
import {
  getKabyMarketAddress,
  getKabyTokenAddress,
  getSummonStakingAddress,
  getKabyHeroAddress,
  getHeroABI,
  getStakingPoolAddress,
  ZERO_ADDRESS,
} from 'constant/contract'
import Web3 from 'web3'
import { getKabyMarketABI } from 'constant/contract/marketplace'
import { getKabyTokenABI } from 'constant/contract/kabyToken'
import { getStakingPoolABI } from 'constant/contract/stakingPool'
import { getSummonStakingPoolABI } from 'constant/contract/summonStakingPool'
import { returnError, returnSuccess } from '../utils/returnFormat'
import { DataSrc, ListHeroName } from 'constant/listName'

const heroTypeString = ['Water', 'Fire', 'Dark', 'Light']

export const getInfoMarketplace = async ({ limit, skip }) => {
  try {
    const { chainId, getContractAsync } = await getInfoWallet()

    const { HERO_ABI } = getHeroABI(chainId)
    const address = getKabyHeroAddress(chainId)
    const { contract: heroContract } = await getContractAsync(address, HERO_ABI)

    const marketplaceNFTAddress = getKabyMarketAddress(chainId)
    const { MARKETPLACE_ABI } = getKabyMarketABI(chainId)
    const { contract: marketplaceNFTContract } = await getContractAsync(
      marketplaceNFTAddress,
      MARKETPLACE_ABI
    )

    const totalHero = await heroContract?.methods.totalSupply().call()
    console.log('🚀 ~ file: heroMarketNFT.js ~ line 34 ~ getInfoMarketplace ~ totalHero', totalHero)

    if (!totalHero) return returnSuccess([])

    const listHero = []

    for (let i = 0; i < totalHero; i++) {
      const { price, seller, star, level, HP, attack, defense, speed, heroType } =
        await marketplaceNFTContract?.methods.SaleInfos(i).call()

      const result = {
        id: i,
        name: ListHeroName[i % ListHeroName.length],
        image: DataSrc[i % DataSrc.length].default,
        price: Number(Web3.utils.fromWei(price, 'ether') || 0),
        seller: seller,
        star: Number(star || 0),
        level: Number(level || 0),
        HP: Number(HP || 0),
        attack: Number(attack || 0),
        defense: Number(defense || 0),
        speed: Number(speed || 0),
        element: heroTypeString[heroType],
        gens: 2,
      }
      console.log('🚀 ~ file: heroMarketNFT.js ~ line 63 ~ getInfoMarketplace ~ result', result)

      listHero.push(result)
    }

    return returnSuccess(listHero)
  } catch (e) {
    console.log('🚀 ~ file: heroMarketNFT.js ~ line 48 ~ getInfoMarketplace ~ e', e)
    return returnError(e.message)
  }
}
