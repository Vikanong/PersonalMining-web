import {
  coinbaseWalletConnection,
  injectedConnection,
  walletConnectConnection,
  ConnectionType
} from '@/connection'
import { Connector } from '@web3-react/types'
import { getConnectionName } from '@/connection/utils'


export interface Config {
  title: string;
  connector: Connector
}

export const connectors: Config[] = [
  {
    title: getConnectionName(ConnectionType.INJECTED, true),
    connector: injectedConnection.connector,
  },
  {
    title: getConnectionName(ConnectionType.WALLET_CONNECT),
    connector: walletConnectConnection.connector,
  },
  {
    title: getConnectionName(ConnectionType.COINBASE_WALLET),
    connector: coinbaseWalletConnection.connector,
  },
]