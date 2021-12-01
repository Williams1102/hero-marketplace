import { InjectedConnector } from '@web3-react/injected-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { networkChainId } from './contract/network'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

const RPC_POLYGON_TEST = 'https://rpc-mumbai.matic.today/'
const RPC_BSC_TEST = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

const RPC_POLYGON = 'https://rpc-mainnet.matic.network/'
const RPC_BSC = 'https://bsc-dataseed.binance.org/'

export const walletSupported = {
  metamask: 'metamask',
  walletconnect: 'walletconnect',
}

var _wallet = walletSupported.metamask

export const SupportedNetwork = [
  networkChainId.bscMainnet,
  networkChainId.bscTestnet,
  networkChainId.polygonMainnet,
  networkChainId.polygonTestnet,
]

export const injected = new InjectedConnector({
  supporteds: SupportedNetwork,
})

let _provider

export const getWalletConnectProvider = () => {
  const walletconnect = new WalletConnectConnector({
    supportedChainIds: SupportedNetwork,
    rpc: {
      [networkChainId.bscMainnet]: RPC_BSC,
      [networkChainId.bscTestnet]: RPC_BSC_TEST,
      [networkChainId.polygonMainnet]: RPC_POLYGON,
      [networkChainId.polygonTestnet]: RPC_POLYGON_TEST,
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000,
  })
  _provider = walletconnect
  return walletconnect
}
const walletconnect = new WalletConnectProvider({
  supportedChainIds: SupportedNetwork,
  rpc: {
    [networkChainId.bscMainnet]: RPC_BSC,
    [networkChainId.bscTestnet]: RPC_BSC_TEST,
    [networkChainId.polygonMainnet]: RPC_POLYGON,
    [networkChainId.polygonTestnet]: RPC_POLYGON_TEST,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: false,
  pollingInterval: 15000,
})

walletconnect.enable()

export function setWallet(walletName) {
  _wallet = walletName
}

export const getWeb3ConnectWallet = async () => {
  const logProvider = await _provider?.getProvider()

  const listWalletProvider = {
    metamask: Web3.givenProvider,
    walletconnect: logProvider,
  }
  const web3 = new Web3(listWalletProvider[_wallet])
  return web3
}
export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Network browser extension detected !'
  } else if (error instanceof UnsupportedChainIdError) {
    console.log(error)
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Network account.'
  } else {
    console.error(error)
    if (error && error.code === -32002) {
      return 'Already processing eth_requestAccounts. Please check extension.'
    }
    return 'An unknown error occurred. Check the console for more details.'
  }
}
