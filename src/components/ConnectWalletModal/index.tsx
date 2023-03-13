import React from "react"
// import useAuth from 'hooks/useAuth'
import { connectors } from '@/connectors'
import { ReactComponent as MetamaskIcon } from 'images/icon/svg/metamask.svg'
import { ReactComponent as WalletConnectIcon } from 'images/icon/svg/walletconnect.svg'
import { ReactComponent as CloseIcon } from 'images/icon/svg/close.svg'
import { Connector } from '@web3-react/types'

import "./index.less"

interface Props {
  checkModal: Function
}

const ConnectWalletModal: React.FC<Props> = ({ checkModal }) => {

  // const { connectWallet, disconnect } = useAuth()
  // 连接钱包
  const connect = (connector: Connector) => {
    // connectWallet(connectorId);
    // localStorage.setItem(connectorLocalStorageKey, connectorId);
    // checkModal(false)
  }

  // 断开钱包
  // const disConnectWallet = () => {
  //   disconnect();
  //   localStorage.removeItem(connectorLocalStorageKey);
  // }

  const getIcon = (title: string) => {
    switch (title) {
      case "MetaMask":
        return <MetamaskIcon />
      case "WalletConnect":
        return <WalletConnectIcon />
      default:
        break;
    }
  }

  return (
    <div className="walletModal">
      <span onClick={() => { checkModal(false) }} className="close">
        <CloseIcon className="svg-icon" />
      </span>
      <ul>
        {connectors.map(entry => (
          <li key={entry.title} onClick={() => {
            connect(entry.connector)
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