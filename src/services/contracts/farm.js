import {
  getFarmABI,
  getFarmKGTAddress,
  getFarmKabyAddress,
  getKabyTokenABI,
} from 'constant/contract'
import PAIR_ABI from 'constant/contract/abis/pairToken.json'
import { getInfoWallet } from './wallet'
import { returnError, returnSuccess } from 'services/utils/returnFormat'
import { BigNumber } from '@ethersproject/bignumber'
import { getPricePairToken } from './dex'
import Web3 from 'web3'
import { rpcApi } from 'constant/rpc'

export const FARM_TYPE = {
  KABY: 'KABY',
  KGT: 'KGT',
}

async function getFarmContractByType(_getContractAsync, chainId, type) {
  const { FARM_ABI } = getFarmABI(chainId)
  const farm = type === FARM_TYPE.KABY ? getFarmKabyAddress(chainId) : getFarmKGTAddress(chainId)
  if (!farm) {
    return null
  }
  const web3 = new Web3(rpcApi[chainId])
  const contract = new web3.eth.Contract(FARM_ABI, farm)
  return contract
}

async function getTokenContract(_getContractAsync, chainId, token) {
  const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
  const web3 = new Web3(rpcApi[chainId])
  const contract = new web3.eth.Contract(KABY_TOKEN_ABI, token)
  return contract
}

async function getPairTokenContract(_getContractAsync, chainId, token) {
  const web3 = new Web3(rpcApi[chainId])
  const contract = new web3.eth.Contract(PAIR_ABI, token)
  return contract
}

export async function getBasicInfo(type) {
  try {
    const { chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    if (!farmContract) {
      return returnSuccess({})
    }
    const [lockTime, rewardPerBlock, totalAllocPoint, poolLength, rewardToken] = await Promise.all([
      farmContract?.methods.poolLockedTime().call(),
      farmContract?.methods.rewardPerBlock().call(),
      farmContract?.methods.totalAllocPoint().call(),
      farmContract?.methods.poolLength().call(),
      farmContract?.methods.rewardToken().call(),
    ])
    return returnSuccess({
      lockTime: Number(lockTime),
      rewardPerBlock: BigNumber.from(rewardPerBlock),
      totalAllocPoint: Number(totalAllocPoint),
      poolLength: Number(poolLength),
      rewardToken,
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getPoolInfo(poolIndex, type) {
  try {
    const { chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const { allocPoint, lpToken, totalNFTPoint, claimRewardTime } = await farmContract?.methods
      .poolInfo(poolIndex)
      .call()
    const tokenContract = await getTokenContract(getContractAsync, chainId, lpToken)
    const supply = await tokenContract?.methods.balanceOf(farmContract.options.address).call()
    return returnSuccess({
      index: poolIndex,
      allocPoint: Number(allocPoint),
      lpToken,
      totalNFTPoint: Number(totalNFTPoint),
      claimRewardTime: Number(claimRewardTime),
      supply: BigNumber.from(supply),
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getUserInfo(poolIndex, type) {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const { amount, lastNFTDepositTimestamp, nftPoint, stakedNFTs, rewardDebt } =
      await farmContract?.methods.getUserInfo(poolIndex, account).call()
    return returnSuccess({
      staked: BigNumber.from(amount),
      lastNFTDepositTimestamp: Number(lastNFTDepositTimestamp),
      nftPoint: Number(nftPoint),
      stakedNFTs,
      rewardDebt: BigNumber.from(rewardDebt),
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function approveFarm(token, type) {
  try {
    const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)

    const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)
    const farm = type === FARM_TYPE.KABY ? getFarmKabyAddress(chainId) : getFarmKGTAddress(chainId)

    const data = await tokenContract?.methods.approve(farm, amount).encodeABI()

    const config = {
      from: account?.toString(),
      to: token,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)
    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function deposit(poolIndex, value, type) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const data = farmContract?.methods.deposit(poolIndex, value).encodeABI()
    const config = {
      from: account?.toString(),
      to: farmContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function withdraw(poolIndex, value, type) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const data = await farmContract?.methods.withdraw(poolIndex, value).encodeABI()

    const config = {
      from: account?.toString(),
      to: farmContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function claimRewards(poolIndex, type) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const data = await farmContract?.methods.claimRewards(poolIndex).encodeABI()

    const config = {
      from: account?.toString(),
      to: farmContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getPendingReward(poolIndex, type) {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const value = await farmContract?.methods.pendingReward(poolIndex, account).call()
    return returnSuccess({
      value: BigNumber.from(value),
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getLockInfo(type) {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const lockInfo = await farmContract?.methods.getLockInfo(account).call()
    return returnSuccess(lockInfo)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function unlock(lockIndexs, type) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const farmContract = await getFarmContractByType(getContractAsync, chainId, type)
    const data = await farmContract?.methods.unlock(account, lockIndexs).encodeABI()

    const config = {
      from: account?.toString(),
      to: farmContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getPairInfo(token, type) {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()
    const farm = type === FARM_TYPE.KABY ? getFarmKabyAddress(chainId) : getFarmKGTAddress(chainId)
    const pairContract = await getPairTokenContract(getContractAsync, chainId, token)
    const [allowance, symbol, balance, decimals, token0, token1, reserves] = await Promise.all([
      pairContract?.methods.allowance(account, farm).call(),
      pairContract?.methods.symbol().call(),
      pairContract?.methods.balanceOf(account).call(),
      pairContract?.methods.decimals().call(),
      pairContract?.methods
        .token0()
        .call()
        .catch(() => null),
      pairContract?.methods
        .token1()
        .call()
        .catch(() => null),
      pairContract?.methods
        .getReserves()
        .call()
        .catch(() => null),
    ])
    let token0Info = null
    let token1Info = null
    if (token0 && token1) {
      const [tokenContract0, tokenContract1] = await Promise.all([
        getTokenContract(getContractAsync, chainId, token0),
        getTokenContract(getContractAsync, chainId, token1),
      ])
      const [symbol0, balance0, decimals0, symbol1, balance1, decimals1] = await Promise.all([
        tokenContract0?.methods.symbol().call(),
        tokenContract0?.methods.balanceOf(account).call(),
        tokenContract0?.methods.decimals().call(),
        tokenContract1?.methods.symbol().call(),
        tokenContract1?.methods.balanceOf(account).call(),
        tokenContract1?.methods.decimals().call(),
      ])
      token0Info = {
        address: token0,
        symbol: symbol0,
        balance: BigNumber.from(balance0),
        decimals: Number(decimals0),
      }
      token1Info = {
        address: token1,
        symbol: symbol1,
        balance: BigNumber.from(balance1),
        decimals: Number(decimals1),
      }
    }
    const tokenInfo = {
      allowance: BigNumber.from(allowance),
      symbol,
      balance: BigNumber.from(balance),
      decimals: Number(decimals),
      token0: token0Info,
      token1: token1Info,
      reserves,
      address: token,
    }
    const price = await getPricePairToken(tokenInfo)
    tokenInfo.price = price
    return returnSuccess(tokenInfo)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function balanceOf(token) {
  const { account, chainId, getContractAsync } = await getInfoWallet()
  const contract = await getTokenContract(getContractAsync, chainId, token)
  const balance = await contract?.methods.balanceOf(account).call()
  return BigNumber.from(balance)
}
