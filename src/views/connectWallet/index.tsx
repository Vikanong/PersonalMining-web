import React, { useState, useEffect } from "react"
import useAuth from 'hooks/useAuth'
import { useActiveWeb3React } from 'hooks/web3hooks'
import { connectorLocalStorageKey, ConnectorNames, connectors } from 'connectors/index'
import { ReactComponent as LogoIcon } from 'images/icon/svg/logo.svg'
// import { useSummary } from 'hooks/useRaiseContract'
import { useTokenInfo, useMainChainBalance } from 'hooks/useContractUtils'
import { truncation } from '@/utils'
import "./index.less"


const ConnectWallet: React.FC = () => {
  const [balance, setBalance] = useState('0')
  const [symbol, setSymbol] = useState('--')
  const [tokenAddress, setTokenAddress] = useState('')
  const { connectWallet, disconnect } = useAuth()
  const { account } = useActiveWeb3React()
  const getMainChainBalance = useMainChainBalance()
  const { getTokenBalance, getTokenSymbol } = useTokenInfo(tokenAddress)

  // const summaryData = useSummary()

  // 连接钱包
  const connect = (connectorId: ConnectorNames) => {
    connectWallet(connectorId);
    localStorage.setItem(connectorLocalStorageKey, connectorId);
  }

  // 断开钱包
  const disConnectWallet = () => {
    disconnect();
    localStorage.removeItem(connectorLocalStorageKey);
  }

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;


  const getBalance = async (par: string) => {
    if (par === 'BNB') {
      const _balance = await getMainChainBalance()
      setBalance(_balance || "0")
      setTokenAddress('')
      setSymbol('BNB')
    } else {
      setTokenAddress('0x0277B12D20F717E1a8b39C66EEE9e8C54A10a111')
    }
  }

  useEffect(() => {
    const get = async () => {
      const _balance = await getTokenBalance()
      setBalance(_balance || "0")
      const sym = await getTokenSymbol()
      setSymbol(sym)
    }
    if (tokenAddress) {
      get()
    }
  }, [tokenAddress])



  return (
    <>
      <div>
        <LogoIcon className="svgIcon logoIcon" />

      </div>
      <div>
        {/* <h1>
          Connect <span>Wallet</span>
        </h1> */}

        <p>{accountEllipsis}</p>


      </div>

      <div>
        {connectors.map(entry => (
          <button key={entry.title} onClick={() => {
            connect(entry.connectorId)
          }}>{entry.title}</button>
        ))}
      </div>

      <div>
        <button onClick={disConnectWallet}>
          disConnect
        </button>
      </div>

      <div>
        {/* {summaryData.totalAmount} */}
      </div>

      <div>
        <p>Address {tokenAddress} {symbol}  Balance {truncation(balance)}</p>
        <button onClick={() => getBalance('BNB')}> GET BNB BALANCE</button>
        <button onClick={() => getBalance('TOKEN')}> GET tOKEN BALANCE</button>
      </div>
    </>
  )
}
export default ConnectWallet;
