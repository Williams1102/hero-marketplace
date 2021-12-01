import { BigNumber } from '@ethersproject/bignumber'
import { getDexABI, getUSDAddress, getDexAddress, getKabyTokenABI } from 'constant/contract'
// import PAIR_ABI from "constant/contract/abis/pairToken.json";
import Web3 from 'web3'
import { getInfoWallet } from './wallet'

async function getDexContract(getContractAsync, chainId) {
  const { DEX_ABI } = getDexABI(chainId)
  const dex = getDexAddress(chainId)
  const { contract: dexContract } = await getContractAsync(dex, DEX_ABI)
  return dexContract
}

async function getTokenContract(getContractAsync, chainId, token) {
  const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
  const { contract: tokenContract } = await getContractAsync(token, KABY_TOKEN_ABI)
  return tokenContract
}

export async function getPricePairToken(tokenInfo) {
  const { address, token0, token1, reserves } = tokenInfo
  const { chainId, getContractAsync } = await getInfoWallet()
  const busd = getUSDAddress(chainId)
  if (address.toLowerCase() === busd.toLowerCase()) {
    return 1
  }
  const dexContract = await getDexContract(getContractAsync, chainId)
  const oneUSD = BigNumber.from(`${10 ** 18}`)
  if (token0 && token1) {
    let price0 = null
    let price1 = null
    if (token0.address.toLowerCase() === busd.toLowerCase()) {
      price0 = [1e18, 1e18]
    }
    if (token1.address.toLowerCase() === busd.toLowerCase()) {
      price1 = [1e18, 1e18]
    }
    ;[price0, price1] = await Promise.all([
      price0 ||
        dexContract?.methods
          .getAmountsOut(oneUSD, [busd, token0.address])
          .call()
          .catch(() => null),
      price1 ||
        dexContract?.methods
          .getAmountsOut(oneUSD, [busd, token1.address])
          .call()
          .catch(() => null),
    ])

    if (!price0 || !price1) {
      return 0
    }
    const token0USD = Number(price0[0]) / Number(price0[1])
    const token1USD = Number(price1[0]) / Number(price1[1])
    const totalUSD =
      token0USD * (Number(reserves.reserve0) / 10 ** token0.decimals) +
      token1USD * (Number(reserves.reserve1) / 10 ** token1.decimals)

    const lpContract = await getTokenContract(getContractAsync, chainId, address)
    const totalSupply = await lpContract?.methods.totalSupply().call()
    return totalUSD / Web3.utils.fromWei(totalSupply)
  } else {
    const price = await dexContract?.methods
      .getAmountsOut(oneUSD, [busd, tokenInfo.address])
      .call()
      .catch(() => null)
    return price ? Number(price[0]) / Number(price[1]) : 0
  }
}
