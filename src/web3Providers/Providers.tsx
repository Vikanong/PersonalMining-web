import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { NetworkContextName } from "connectors/index"

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        {children}
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers