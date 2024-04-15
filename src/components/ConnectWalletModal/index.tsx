import React from "react"
import { connectors, Config } from '@/connectors'
import { ReactComponent as MetamaskIcon } from 'images/icon/svg/metamask.svg'
import { ReactComponent as WalletConnectIcon } from 'images/icon/svg/walletconnect.svg'
import { ReactComponent as CoinbaseWalletIcon } from 'images/icon/svg/coinbaseWalletIcon.svg'
import { ReactComponent as CloseIcon } from 'images/icon/svg/close.svg'

import "./index.less"

interface Props {
  checkConnectWallet: Function
}

const ConnectWalletModal: React.FC<Props> = ({ checkConnectWallet }) => {

  const connect = async (entry: Config) => {
    if (entry.connector) {
      try {
        await entry.connector.activate();
        window.localStorage.setItem("ConnectionType", entry.title);
        checkConnectWallet(false)
      } catch (error) {
        checkConnectWallet(false)
        console.log(error);
      }
    }
  }

  const getIcon = (title: string) => {
    switch (title) {
      case "MetaMask":
        return <MetamaskIcon />
      case "WalletConnect":
        return <WalletConnectIcon />
      case "Coinbase Wallet":
        return <CoinbaseWalletIcon />
      default:
        break;
    }
  }

  return (
    <div className="walletModal">
      <span onClick={() => { checkConnectWallet(false) }} className="close">
        <CloseIcon className="svg-icon" />
      </span>
      <ul>
        {connectors.map(entry => (
          <li key={entry.title} onClick={() => {
            connect(entry)
          }}>
            <span>
              {getIcon(entry.title)}
            </span>
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ConnectWalletModal