import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorsByName, ConnectorNames, connectorLocalStorageKey } from 'connectors/index'
import { tip, toHex } from "@/utils"

const providerRequest = async (method: any, params: any) => {
  const ethereum = window?.ethereum;
  return await ethereum.request({ method, params })
};

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const connectWallet = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        window.localStorage.removeItem(connectorLocalStorageKey)
        if (error instanceof UnsupportedChainIdError) {
          await providerRequest('wallet_switchEthereumChain', [{ chainId: toHex(connector.supportedChainIds[0]) }])
          console.error('Unsupported Chain Id', 'Unsupported Chain Id Error. Check your chain Id.');
        } else if (error instanceof NoEthereumProviderError) {
          console.error('Provider Error', 'No provider was found')
          tip("No provider was found")
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector: any = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          console.error('Authorization Error', 'Please authorize to access your account')
        } else {
          console.error(error.name, error.message)
        }
      })
    } else {
      console.error("Can't find connector", 'The connector config is wrong')
    }
  }, [activate])

  return { connectWallet, disconnect: deactivate }
}

export default useAuth
