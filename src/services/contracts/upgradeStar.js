import {
  getUpgradeStarABI,
  getKabyTokenABI,
  getUpgradeStarAddress,
  getKabyTokenAddress,
} from 'constant/contract'
import { getInfoWallet } from './wallet'
import { returnError, returnSuccess } from 'services/utils/returnFormat'

async function getUpgradeStarContract(getContractAsync, chainId) {
  const { UPGRADE_START_ABI } = getUpgradeStarABI(chainId)
  const contractAddress = getUpgradeStarAddress(chainId)
  if (!contractAddress) {
    return null
  }
  const { contract } = await getContractAsync(contractAddress, UPGRADE_START_ABI)
  return contract
}

async function getKabyTokenContract(getContractAsync, chainId) {
  const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
  const kaby = getKabyTokenAddress(chainId)
  const { contract: tokenContract } = await getContractAsync(kaby, KABY_TOKEN_ABI)
  return tokenContract
}

export async function upgradeStarForHero(heroId) {
  try {
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const upgradeStarContract = await getUpgradeStarContract(getContractAsync, chainId)
    const data = upgradeStarContract?.methods.upgradeStarForHero(heroId).encodeABI()
    const config = {
      from: account?.toString(),
      to: upgradeStarContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)

    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}

export async function getHeroLevel(heroId) {
  const { chainId, getContractAsync } = await getInfoWallet()
  const contract = await getUpgradeStarContract(getContractAsync, chainId)
  const level = await contract?.methods.heroLevel(heroId).call()
  return Number(level)
}

export async function getAmountUpStar(currentStart) {
  const { chainId, getContractAsync } = await getInfoWallet()
  const contract = await getUpgradeStarContract(getContractAsync, chainId)
  const index = Number(currentStart) - 1
  const amount = await contract?.methods.payAmountForUpStar(index).call()
  return Number(amount)
}

export async function getAllowance() {
  const { account, chainId, getContractAsync } = await getInfoWallet()
  const tokenContract = await getKabyTokenContract(getContractAsync, chainId)
  const upgrade = getUpgradeStarAddress(chainId)
  const allowance = await tokenContract?.methods.allowance(account, upgrade).call()
  return Number(allowance)
}

export async function approveUpgrade() {
  try {
    const amount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const { web3, account, chainId, getContractAsync } = await getInfoWallet()
    const tokenContract = await getKabyTokenContract(getContractAsync, chainId)
    const upgrade = getUpgradeStarAddress(chainId)

    const data = await tokenContract?.methods.approve(upgrade, amount).encodeABI()

    const config = {
      from: account?.toString(),
      to: tokenContract?.options.address,
      data,
      value: '0x00',
    }
    const result = await web3.eth.sendTransaction(config)
    return returnSuccess(result)
  } catch (error) {
    return returnError(error.message)
  }
}
