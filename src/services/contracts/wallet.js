import Web3 from 'web3'
import { getKabyTokenAddress, getKabyGameTokenAddress } from 'constant/contract'
import { getWeb3ConnectWallet } from 'constant/connector'
import { getKabyTokenABI } from 'constant/contract/kabyToken'
import { getKabyGameTokenABI } from 'constant/contract/kabyGameToken'

export const getInfoWallet = async () => {
  const web3 = await getWeb3ConnectWallet()
  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  async function getContractAsync(address, abi) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!address || !abi) {
          return resolve({
            contract: undefined,
          })
        }
        const contract = new web3.eth.Contract(abi, address)
        resolve({ contract })
      } catch (error) {
        reject(error)
      }
    })
  }

  async function getTokenBalance(walletAddress) {
    try {
      const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
      const addressToken = getKabyTokenAddress(chainId)

      const { contract: tokenContract } = await getContractAsync(addressToken, KABY_TOKEN_ABI)

      const balance = await tokenContract?.methods.balanceOf(walletAddress).call()

      if (balance) {
        const kabyBalance = Number(Web3.utils.fromWei(balance))
        return { kabyBalance }
      } else return { kabyBalance: 0 }
    } catch (error) {
      return { error: error.message }
    }
  }

  async function getKabyGameTokenBalance(walletAddress) {
    try {
      const { KABY_GAME_TOKEN_ABI } = getKabyGameTokenABI(chainId)
      const addressToken = getKabyGameTokenAddress(chainId)

      const { contract: tokenContract } = await getContractAsync(addressToken, KABY_GAME_TOKEN_ABI)

      const balance = await tokenContract?.methods.balanceOf(walletAddress).call()

      if (balance) {
        const kabyGameTokenBalance = Number(Web3.utils.fromWei(balance))
        return { kabyGameTokenBalance }
      } else return { kabyGameTokenBalance: 0 }
    } catch (error) {
      return { error: error.message }
    }
  }

  async function getKabyGameTokenContract() {
    const { KABY_GAME_TOKEN_ABI } = getKabyGameTokenABI(chainId)
    const addressToken = getKabyGameTokenAddress(chainId)

    const { contract: tokenContract } = await getContractAsync(addressToken, KABY_GAME_TOKEN_ABI)
    return tokenContract
  }

  async function getKabyContract() {
    const { KABY_TOKEN_ABI } = getKabyTokenABI(chainId)
    const addressToken = getKabyTokenAddress(chainId)

    const { contract: tokenContract } = await getContractAsync(addressToken, KABY_TOKEN_ABI)
    return tokenContract
  }

  const getInfoTransaction = async (tx) => {
    try {
      const info = await web3.eth.getTransactionReceipt(tx)

      if (info) {
        return {
          success: true,
          data: info,
        }
      }
      return {
        success: false,
        data: null,
      }
    } catch (e) {
      console.log(e.message)
      return {
        success: false,
        error: e.message,
      }
    }
  }

  return {
    web3,
    chainId,
    account: accounts[0],
    getInfoTransaction,
    getContractAsync,
    getTokenBalance,
    getKabyGameTokenBalance,
    getKabyGameTokenContract,
    getKabyContract,
  }
}
