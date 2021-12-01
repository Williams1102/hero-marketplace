import axios from 'axios'
import { systemWithdrawWallet, systemWithdrawWalletProduction } from 'constant/contract/usersSystem'
import queryString from 'query-string'

const { REACT_APP_ENVIRONMENT } = process.env
class userAPI {
  constructor() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_ACCOUNT_API,
      headers: {
        'content-type': 'application/json',
      },
      paramsSerializer: (params) => queryString.stringify(params),
    })

    instance.interceptors.response.use(
      (response) => {
        // Return JSON data
        if (response.data) {
          return response.data
        }
        return response
      },
      (error) => {
        // Attempt to get the actual error returned from API
        const err = (error.response && error.response.data && error.response.data) || error

        return Promise.reject(err) // Propagate rejection back to caller
      }
    )
    this.http = instance
  }

  getToken = () => {
    return localStorage.getItem('token') ? `Bearer ${localStorage['token']}` : undefined
  }

  createOffChainAccount = async (headers, data) => {
    try {
      const token = this.getToken()
      if (token) {
        headers.Authorization = token
      }
      console.log('createOffChainAccount', data, headers)
      const result = await this.http.post('create-user', data, { headers })
      return result
    } catch (err) {
      throw err
    }
  }

  getOffChainAccount = async (headers, { address }) => {
    try {
      const params = { address }
      headers.Authorization = this.getToken()
      const result = await this.http.get('user', { params, headers })
      return result
    } catch (err) {
      throw err
    }
  }

  getAllTransactions = async ({
    networkId = 1,
    pageSize = 20,
    pageNumber = 1,
    transactionType = '',
    address = '',
  }) => {
    try {
      const params = {
        networkId,
        pageSize,
        pageNumber,
        transactionType,
        address,
      }
      const headers = { Authorization: this.getToken() }
      const result = await this.http.get('transactions', { params, headers })
      return result
    } catch (err) {
      throw err
    }
  }

  getInfoTransaction = async ({ TxId }) => {
    try {
      const params = { id: TxId }
      const headers = { Authorization: this.getToken() }
      const result = await this.http.get('transaction', { params, headers })
      return result
    } catch (err) {
      throw err
    }
  }

  addWithdrawTransaction = async (
    { sign, message },
    { toAddress, value, networkId = 1, fee = 200 }
  ) => {
    try {
      const from =
        REACT_APP_ENVIRONMENT === 'development'
          ? systemWithdrawWallet
          : systemWithdrawWalletProduction
      const data = {
        transactionType: 'Withdraw',
        from,
        recipientAddress: toAddress,
        to: toAddress,
        value,
        fee,
        networkId,
        timestamp: Date.now(),
      }
      const token = this.getToken()
      const config = token
        ? {
            headers: { sign, message, Authorization: token },
          }
        : {
            headers: { sign, message },
          }
      console.log(config, data)
      const result = await this.http.post('add-transaction', data, config)
      return result
    } catch (err) {
      throw err
    }
  }
}

export default new userAPI()
