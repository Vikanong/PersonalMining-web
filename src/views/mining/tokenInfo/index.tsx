import React, { useState, useEffect, useCallback } from "react"
import "./index.less"
import { getContractAddress } from '@/utils/contractUtils'
import Tokens from 'constants/tokenAddress'
import addTokenWallet from "@/utils/addTokenWallet"
import { useWeb3React } from "@web3-react/core"
import { useMiningContract } from 'hooks/useContract'
import useMining from 'hooks/useMiningContract'

const TokenInfo: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const miningContract = useMiningContract();
  const { receiveToken } = useMining(miningContract);

  const { provider, account, connector } = useWeb3React();
  const tokenAddress = getContractAddress(Tokens.HEY);

  const token = {
    address: tokenAddress || "",
    symbol: "HEY",
    decimals: 18,
    image: ""
  }

  const addToken = useCallback(() => {
    if (!token?.symbol || !connector.watchAsset) return;
    setDisabled(true);
    connector.watchAsset(token).then(r => {
      setDisabled(false);
    }).catch(() => {
      setDisabled(false);
    })
  }, [connector, token])


  const receiveTokenClick = async () => {
    setDisabled(true);
    const Tx = await receiveToken();
    setDisabled(false);
    return Tx
  }

  return (
    <div className="tokenInfo">
      <div className="infoItem">
        <div className="label">Symbol:</div>
        <div className="value symbol">HEY</div>
      </div>

      <div className="infoItem">
        <div className="label">Token:</div>
        <div className="value ellipsis">{tokenAddress}</div>
      </div>

      <div className="operate">
        <button onClick={addToken} disabled={disabled}>Add To Wallet</button>
        <button onClick={receiveTokenClick} disabled={disabled}>Receive Test Token</button>
      </div>
    </div>
  )
}

export default TokenInfo