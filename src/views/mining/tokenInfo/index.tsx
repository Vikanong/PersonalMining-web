import React, { useState, useCallback } from "react";
import "./index.less";
import { useWeb3React } from "@web3-react/core";
import { useMiningContract } from 'hooks/useContract';
import useMining from 'hooks/useMiningContract';
import { getContractAddress } from '@/utils/contractUtils';
import Tokens from 'constants/tokenAddress';

const TokenInfo: React.FC = () => {
  const { account, connector } = useWeb3React();
  const miningContract = useMiningContract();
  const { receiveToken } = useMining(miningContract);

  const tokenAddress = getContractAddress(Tokens.HEY);

  const token = {
    address: tokenAddress || "",
    symbol: "HEY",
    decimals: 18,
    image: ""
  };

  const [disabled, setDisabled] = useState(false);

  const handleAddToken = useCallback(async () => {
    if (!account || !token.symbol || !connector.watchAsset) return;

    try {
      setDisabled(true);
      await connector.watchAsset(token);
    } catch (error) {
      console.error("添加代币到钱包时出错：", error);
    } finally {
      setDisabled(false);
    }
  }, [connector, token, account]);

  const handleReceiveToken = useCallback(async () => {
    if (!account) return;

    try {
      setDisabled(true);
      const Tx = await receiveToken();
      return Tx;
    } catch (error) {
      console.error("领取代币时出错：", error);
    } finally {
      setDisabled(false);
    }
  }, [account, receiveToken]);

  return (
    <div className="tokenInfo">
      <div className="infoItem">
        <div className="label">代币符号：</div>
        <div className="value symbol">HEY</div>
      </div>

      <div className="infoItem">
        <div className="label">代币地址：</div>
        <div className="value ellipsis">{tokenAddress}</div>
      </div>

      <div className="operate">
        <button onClick={handleAddToken} disabled={disabled} title="将代币添加到钱包">Add To Wallet</button>
        <button onClick={handleReceiveToken} disabled={disabled} title="领取测试代币">Receive Test Token</button>
      </div>
    </div>
  );
};

export default TokenInfo;
