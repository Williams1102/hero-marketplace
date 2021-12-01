import {
  getKabyHeroAddress,
  getHeroABI,
  getKabyMarketAddress,
  getKabyTokenABI,
  getKabyTokenAddress,
} from 'constant/contract'
import { getInfoWallet } from './wallet'
import Web3 from 'web3'

export function getLatestVersion() {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()
      const { HERO_ABI } = getHeroABI(chainId)
      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const version = await kabyContract?.methods.getLatestVersion().call()
      resolve({
        version,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getHeros() {
  const { chainId, getContractAsync } = await getInfoWallet()

  const { HERO_ABI } = getHeroABI(chainId)
  const address = getKabyHeroAddress(chainId)
  const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)

  const options = {
    fromBlock: 0,
    toBlock: 'latest',
  }
  const events = await kabyContract.getPastEvents('HeroCreated', {
    ...options,
  })

  return events
}

export function getHeroOwner(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { HERO_ABI } = getHeroABI(chainId)
      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const owner = await kabyContract?.methods.ownerOf(heroId).call({ from: account })
      resolve({
        owner,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function getKabyToken() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const token = getKabyTokenAddress(chainId)
      const kaby = getKabyHeroAddress(chainId)
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

export function getVersion() {
  return new Promise(async (resolve, reject) => {
    try {
      const { account, chainId, getContractAsync } = await getInfoWallet()

      const { HERO_ABI } = getHeroABI(chainId)
      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const versionId = await getLatestVersion()
      const version = await kabyContract?.methods
        .versions(Number(versionId.version))
        .call({ from: account })
      resolve(version)
    } catch (error) {
      reject(error)
    }
  })
}

export function getStarInfo(heroId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()
      const { HERO_ABI } = getHeroABI(chainId)
      const address = getKabyHeroAddress(chainId)

      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)

      const star = await kabyContract?.methods.getHeroStar(heroId).call()

      resolve({
        heroId,
        star: Number(star) || 1,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function claimHero(amount) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()
      const { HERO_ABI } = getHeroABI(chainId)

      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const versionId = await getLatestVersion()
      const data = await kabyContract?.methods
        .claimHero(Number(versionId?.version), amount)
        .encodeABI()
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

export function giftHeroToAddress(heroId, to) {
  return new Promise(async (resolve, reject) => {
    try {
      const { web3, account, chainId, getContractAsync } = await getInfoWallet()
      const { HERO_ABI } = getHeroABI(chainId)

      const address = getKabyHeroAddress(chainId)
      const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
      const data = await kabyContract?.methods.transferFrom(account, to, heroId).encodeABI()
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

export async function getHeroStaredUp(filter) {
  try {
    const { chainId, getContractAsync } = await getInfoWallet()

    const { HERO_ABI } = getHeroABI(chainId)
    const address = getKabyHeroAddress(chainId)
    const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
    const options = {
      fromBlock: 0,
      toBlock: 'latest',
    }
    const events = await kabyContract.getPastEvents('HeroStarUpgraded', {
      ...options,
      filter,
    })
    const res = events.map((o) => o.returnValues)
    return [...res]
  } catch (e) {
    return null
  }
}

export async function getAmountSummoned(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const { chainId, getContractAsync } = await getInfoWallet()

      const heroAddress = getKabyHeroAddress(chainId)
      const { HERO_ABI } = getHeroABI(chainId)

      const { contract: kabyContract } = await getContractAsync(heroAddress, HERO_ABI)
      const data = await kabyContract?.methods.amountClaimed(user).call()

      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export const checkIsMarketApprovedForAll = async () => {
  try {
    const { chainId, getContractAsync, account } = await getInfoWallet()
    const heroAddress = getKabyHeroAddress(chainId)
    const { HERO_ABI } = getHeroABI(chainId)

    const marketplace = getKabyMarketAddress(chainId)

    const { contract: heroContract } = await getContractAsync(heroAddress, HERO_ABI)
    const data = await heroContract?.methods.isApprovedForAll(account, marketplace).call()

    return {
      success: true,
      data: data,
    }
  } catch (e) {
    return {
      success: false,
      error: e.message,
    }
  }
}

export const marketApproveForAll = async () => {
  try {
    const { chainId, getContractAsync, account, web3 } = await getInfoWallet()
    const heroAddress = getKabyHeroAddress(chainId)
    const { HERO_ABI } = getHeroABI(chainId)

    const marketplace = getKabyMarketAddress(chainId)

    const { contract: heroContract } = await getContractAsync(heroAddress, HERO_ABI)
    const data = await heroContract?.methods.setApprovalForAll(marketplace, true).encodeABI()
    const config = {
      from: account?.toString(),
      to: heroAddress,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return {
      success: true,
      data: result,
    }
  } catch (e) {
    return {
      success: false,
      error: e.message,
    }
  }
}

/** OFFER OLD HERO  */
export async function getHerosWithOldOffers(heroId, buyer) {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()
    const { HERO_ABI } = getHeroABI(chainId)

    const address = getKabyHeroAddress(chainId)
    const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)

    const offer = await kabyContract?.methods.herosWithOffers(heroId, buyer).call({ from: account })

    return {
      success: true,
      data: offer,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function cancelOldOffer(heroId) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const { HERO_ABI } = getHeroABI(chainId)
    const address = getKabyHeroAddress(chainId)

    const { contract: kabyContract } = await getContractAsync(address, HERO_ABI)
    const data = await kabyContract?.methods.cancelOffer(heroId).encodeABI()
    const config = {
      from: account?.toString(),
      to: address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    }
  }
}
