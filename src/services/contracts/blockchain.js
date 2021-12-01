import { getInfoWallet } from './wallet'
import {
  getKabyMarketAddress,
  getKabyTokenAddress,
  getSummonStakingAddress,
  getKabyHeroAddress,
  getHeroABI,
  getStakingPoolAddress,
} from 'constant/contract'
import Web3 from 'web3'
import { getKabyMarketABI } from 'constant/contract/marketplace'
import { getKabyTokenABI } from 'constant/contract/kabyToken'
import { getStakingPoolABI } from 'constant/contract/stakingPool'
import { getSummonStakingPoolABI } from 'constant/contract/summonStakingPool'
export * from './hero'

export function getHerosWithOffers(heroId, buyer) {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const offer = await kabyContract?.methods
        .herosWithOffers(heroId, buyer)
        .call({ from: account })
      resolve({
        offer,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function offerHero(heroId, offerValue) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const BN = Web3.utils.toWei(offerValue, 'ether')
      const data = await kabyContract?.methods.offer(heroId, BN).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export function cancelOffer(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const data = await kabyContract?.methods.cancelOffer(heroId).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getOfferHistory(filter) {
  const { chainId, getContractAsync } = await getInfoWallet()

  const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
  const address = getKabyMarketAddress(chainId)
  const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)

  const options = {
    fromBlock: 0,
    toBlock: 'latest',
  }
  const events = await kabyContract.getPastEvents('HeroOffered', {
    ...options,
    filter,
  })

  return [...events]
}

export async function getCancelOfferHistory(filter) {
  const { chainId, getContractAsync } = await getInfoWallet()

  const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
  const address = getKabyMarketAddress(chainId)
  const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
  const options = {
    fromBlock: 0,
    toBlock: 'latest',
  }
  const events = await kabyContract.getPastEvents('HeroOfferCanceled', {
    ...options,
    filter,
  })
  return events
}

export function getCanceledListOffer(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const events = await getCancelOfferHistory()
      const offersCanceled = [...events].map((event) => event.returnValues)
      const filter = [...offersCanceled]
        .filter((event) => event.heroId === heroId)
        .map((event) => {
          return { ...event }
        })
      resolve([...filter])
    } catch (error) {
      reject(error)
    }
  })
}

export function getListOffer(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const offerEvents = await getOfferHistory({ heroId })
      const cancelEvents = await getCancelOfferHistory({ heroId })

      cancelEvents.forEach((cancelEvent) => {
        const offer = offerEvents.find(
          (offerEvent) =>
            offerEvent.returnValues.buyer === cancelEvent.returnValues.buyer &&
            offerEvent.blockNumber < cancelEvent.blockNumber
        )
        if (offer) {
          const index = offerEvents.indexOf(offer)
          if (index >= 0) {
            offerEvents.splice(index, 1)
          }
        }
      })
      const offers = offerEvents.map((offerEvent) => offerEvent.returnValues)
      const filter = offers.map((offerEvent) => {
        return { ...offerEvent, price: offerEvent.price }
      })
      resolve(filter)
    } catch (error) {
      reject(error)
    }
  })
}

export function takeOfferHero(heroId, buyer, minPrice) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const data = await kabyContract?.methods.takeOffer(heroId, buyer, minPrice).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export function getHeroOnSale(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const price = await kabyContract?.methods.herosOnSale(heroId).call({ from: account })

      const safeNumber = Web3.utils.fromWei(price, 'ether')
      resolve({
        heroId,
        price: safeNumber,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function buyHero(heroId, price) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)

      const priceBN = Web3.utils.toWei(price.toString(), 'ether')

      const data = await kabyContract?.methods.buy(heroId, priceBN).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export function listHeroOnSale(heroId, price) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)

      const BN = Web3.utils.toWei(price, 'ether')

      const data = await kabyContract?.methods.list(heroId, BN).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export function delistHeroOnSale(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { MARKETPLACE_ABI: KABY_ABI } = getKabyMarketABI(chainId)
      const address = getKabyMarketAddress(chainId)

      const { contract: kabyContract } = await getContractAsync(address, KABY_ABI)
      const data = await kabyContract?.methods.delist(heroId).encodeABI()
      const config = {
        from: account?.toString(),
        to: address,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export function getMarketKabyToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const token = getKabyTokenAddress(chainId)
      const kaby = getKabyMarketAddress(chainId)
      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const [allowance] = await Promise.all([
        tokenContract?.methods.allowance(account, kaby).call(),
      ])
      const allowNumber = Number(Web3.utils.fromWei(allowance))
      resolve({
        address: token,
        allowance: allowNumber,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function approveMarket() {
  return new Promise(async (resolve, reject) => {
    try {
      const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const token = getKabyTokenAddress(chainId)

      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const market = getKabyMarketAddress(chainId)

      const data = await tokenContract?.methods.approve(market, amount).encodeABI()
      const config = {
        from: account?.toString(),
        to: token,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export async function approve(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)
      const kaby = getKabyHeroAddress(chainId)

      const data = await tokenContract?.methods.approve(kaby, amount).encodeABI()
      const config = {
        from: account?.toString(),
        to: token,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getStakingPool() {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const { HERO_ABI } = getHeroABI(chainId)
      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const stakingPool = await kabyContract?.methods.stakingPoolAddress().call()
      resolve({
        stakingPool,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getAcceptedKabyToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const staking = await getStakingPool()
      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const token = getKabyTokenAddress(chainId)

      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const [decimals, name, symbol, allowance] = await Promise.all([
        tokenContract?.methods.decimals().call(),
        tokenContract?.methods.name().call(),
        tokenContract?.methods.symbol().call(),
        tokenContract?.methods.allowance(account, staking.stakingPool).call(),
      ])
      resolve({
        address: token,
        decimals,
        name,
        symbol,
        allowance,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getBalanceSummon() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)
      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )
      const summonBalance = await summonStakingPool?.methods.balanceOf(account).call()

      const amount = Web3.utils.fromWei(summonBalance, 'ether')

      resolve({
        summonBalance: Number(amount),
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function stakeForBuyHero(amount) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)
      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )

      const amountBN = web3.utils.toWei(amount, 'ether')
      const data = await summonStakingPool?.methods.stakeForBuyHero(amountBN).encodeABI()

      const config = {
        from: account?.toString(),
        to: summonStaking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

//30 - 9 => unstake
export async function unstakeFromBuy() {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)
      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )
      const data = await summonStakingPool?.methods.unstake().encodeABI()
      const config = {
        from: account?.toString(),
        to: summonStaking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}
// 30 - 9 => claim
export async function claimFromBuy() {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)

      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )
      const data = await summonStakingPool?.methods.claim().encodeABI()
      const config = {
        from: account?.toString(),
        to: summonStaking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getSummonStakingToken() {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()

    const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
    const token = getKabyTokenAddress(chainId)
    const summonStaking = getSummonStakingAddress(chainId)

    const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)
    const decimals = await tokenContract?.methods.decimals().call()
    const name = await tokenContract?.methods.name().call()
    const symbol = await tokenContract?.methods.symbol().call()
    const allowance = await tokenContract?.methods.allowance(account, summonStaking).call()

    const amount = Number(Web3.utils.fromWei(allowance))
    const result = {
      address: token,
      decimals,
      name,
      symbol,
      allowance: amount,
    }
    return { result }
  } catch (error) {
    return { error: error.message }
  }
}

export async function approveSummonStakingPool(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)

      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const summonStaking = getSummonStakingAddress(chainId)

      const data = await tokenContract?.methods.approve(summonStaking, amount).encodeABI()
      const config = {
        from: account?.toString(),
        to: token,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export async function getReWardStaking(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)
      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )
      const tokensReward = await summonStakingPool?.methods.getStakingReward(user).call()

      const amount = Web3.utils.fromWei(tokensReward)
      resolve({
        tokensReward: amount,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getTotalBalanceSummonStaking() {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getTokenBalance } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)

      const totalLockValue = await getTokenBalance(summonStaking)

      resolve(totalLockValue.kabyBalance)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getMaxAmountSummon(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const summonStaking = getSummonStakingAddress(chainId)
      const { SUMMON_STAKING_POOL_ABI } = getSummonStakingPoolABI(chainId)
      const { contract: summonStakingPool } = await getContractAsync(
        summonStaking,
        SUMMON_STAKING_POOL_ABI
      )

      const amount = await summonStakingPool?.methods.getMaxAmountSummon(user).call()
      resolve(amount)
    } catch (error) {
      reject(error)
    }
  })
}

export async function checkStakingData(user, heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const staking = await getStakingPool(chainId)
      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(
        staking.stakingPool,
        STAKING_POOL_ABI
      )
      const stakingData = await stakingPoolContract?.methods.stakingData(user, heroId).call()
      resolve({
        stakingData,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function checkUpgradeStar(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const staking = await getStakingPool(chainId)
      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(
        staking.stakingPool,
        STAKING_POOL_ABI
      )
      const canUpStar = await stakingPoolContract?.methods.canUpStar(heroId).call()
      resolve({
        canUpStar,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getAllowanceStakingPool() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()
      const token = getKabyTokenAddress(chainId)

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)

      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const stakingPool = getStakingPoolAddress(chainId)

      const result = await tokenContract.methods?.allowance(account, stakingPool).call()

      resolve(Number(result))
    } catch (e) {
      reject(e)
    }
  })
}

export async function approveStakingPool() {
  return new Promise(async (resolve, reject) => {
    try {
      const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()
      const token = getKabyTokenAddress(chainId)
      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)

      const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

      const stakingPool = getStakingPoolAddress(chainId)

      const data = await tokenContract?.methods.approve(stakingPool, amount).encodeABI()
      const config = {
        from: account?.toString(),
        to: token,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export async function stakeForUpgradeLevel(heroId, amount) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)
      const amountBN = web3.utils.toWei(amount, 'ether')

      const data = await stakingPoolContract?.methods.stake(heroId, amountBN).encodeABI()
      const config = {
        from: account?.toString(),
        to: staking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function upgradeStarForHero(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)
      const data = await stakingPoolContract?.methods.upgradeStarForHero(heroId).encodeABI()
      const config = {
        from: account?.toString(),
        to: staking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function claim(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)
      const data = await stakingPoolContract?.methods.claim(heroId).encodeABI()
      const config = {
        from: account?.toString(),
        to: staking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function unstake(heroId, amount) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()

      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)
      const amountBN = web3.utils.toWei(amount, 'ether')
      const data = await stakingPoolContract?.methods.unstake(heroId, amountBN).encodeABI()
      const config = {
        from: account?.toString(),
        to: staking,
        data,
        value: '0x00',
      }
      const result = await web3.eth.sendTransaction(config)
      resolve({
        result,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getHeroStakings(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()
      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)

      const data = [
        await stakingPoolContract?.methods.earned(heroId, account).call(),
        await stakingPoolContract?.methods.heroEarnedExp(heroId).call(),
        await stakingPoolContract?.methods.heroLevel(heroId).call(),
        await stakingPoolContract?.methods.stakingData(account, heroId).call(),
      ]

      resolve({
        reward: {
          expEarned: Number(web3.utils.fromWei(data[0][0], 'ether')),
          tokenEarned: Math.floor(Number(web3.utils.fromWei(data[0][1], 'ether')) * 10000) / 10000,
        },
        currentExp: Math.floor(Number(web3.utils.fromWei(data[1], 'ether')) * 10000) / 10000,
        currentLevel: Number(data[2]) || 1,
        staked: Number(web3.utils.fromWei(data[3].balance, 'ether')),
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getAmountUpStar(star) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()
      const staking = getStakingPoolAddress(chainId)

      const { STAKING_POOL_ABI } = getStakingPoolABI(chainId)
      const { contract: stakingPoolContract } = await getContractAsync(staking, STAKING_POOL_ABI)

      const data = [await stakingPoolContract?.methods.payAmountForUpStar(star).call()]

      resolve({
        upStarAmount: Number(data[0]),
      })
    } catch (error) {
      reject(error)
    }
  })
}
