import {
  getAirdropHeroABI,
  getAirdropHeroAddress,
  getKabyTokenABI,
  getKabyTokenAddress,
} from 'constant/contract'
import { getInfoWallet } from './wallet'
import Web3 from 'web3'
import { returnError, returnSuccess } from 'services/utils/returnFormat'

export async function getAllowanceAirdropHero() {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()

    const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
    const token = getKabyTokenAddress(chainId)
    const airdropHeroContract = getAirdropHeroAddress(chainId)
    const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)

    const [allowance] = await Promise.all([
      tokenContract?.methods.allowance(account, airdropHeroContract).call(),
    ])
    const allowNumber = Number(Web3.utils.fromWei(allowance))
    return returnSuccess({
      address: token,
      allowance: allowNumber,
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function approveAirdropHero() {
  try {
    const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()

    const token = getKabyTokenAddress(chainId)
    const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)

    const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)
    const airdropHero = getAirdropHeroAddress(chainId)

    const data = await tokenContract?.methods.approve(airdropHero, amount).encodeABI()

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

export async function getAirdropped() {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()

    const { AIRDROP_ABI } = getAirdropHeroABI(chainId)
    const address = getAirdropHeroAddress(chainId)
    const { contract: airdropHeroContract } = await getContractAsync(address, AIRDROP_ABI)
    const owner = await airdropHeroContract?.methods.airdroped(account).call({ from: account })
    return returnSuccess(owner)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getMaxAirdrop() {
  try {
    const { account, chainId, getContractAsync } = await getInfoWallet()

    const { AIRDROP_ABI } = getAirdropHeroABI(chainId)
    const address = getAirdropHeroAddress(chainId)
    const { contract: airdropHeroContract } = await getContractAsync(address, AIRDROP_ABI)
    const amount = await airdropHeroContract?.methods
      .getMaxAmountClaim(account)
      .call({ from: account })
    return returnSuccess(amount)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function claimHero(amount) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const { AIRDROP_ABI } = getAirdropHeroABI(chainId)

    const address = getAirdropHeroAddress(chainId)
    const { contract: kabyContract } = await getContractAsync(address, AIRDROP_ABI)
    const data = await kabyContract?.methods.claimHero(amount).encodeABI()

    const config = {
      from: account?.toString(),
      to: address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}
