import { useEffect } from 'react'
import { Connector } from '@web3-react/types'
import { networkConnection } from '@/connection'
import { connectors } from '@/connectors'

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerlyConnect() {
  // const dispatch = useAppDispatch()
  const selectedWallet = window.localStorage.getItem("ConnectionType");
  let connector: Connector | undefined

  if (selectedWallet) {
    connector = connectors.find(wallet => wallet.title === selectedWallet)?.connector
  }

  useEffect(() => {
    // connect(gnosisSafeConnection.connector)
    connect(networkConnection.connector)
    if (connector) {
      connect(connector)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
