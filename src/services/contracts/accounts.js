import { getInfoWallet } from './wallet'
import { returnError, returnSuccess } from 'services/utils/returnFormat'

export async function signRandomMessage() {
  try {
    const { web3, account } = await getInfoWallet()
    const message = `If you click the "sign" button, you agree to authorize us to make this transaction. Your Wallet Address: ${account} Timestamp: ${Date.now()}`
    const signature = await web3.eth.personal.sign(message, account)

    return returnSuccess({
      signature,
      message,
    })
  } catch (error) {
    return returnError(error.message)
  }
}

export async function signLoginMessage() {
  try {
    const { web3, account } = await getInfoWallet()
    const message = `If you click the "sign" button, you agree to authorize us to make this transaction. Your Wallet Address: ${account} Timestamp: ${Date.now()}`
    const signature = await web3.eth.personal.sign(message, account)

    return returnSuccess({
      signature,
      message,
    })
  } catch (error) {
    return returnError(error.message)
  }
}
