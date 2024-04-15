import React, { useState, useEffect } from "react";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import Loading from "@/components/Loading";
import useMining from 'hooks/useMiningContract';
import { useMiningContract } from 'hooks/useContract';
import Header from "./header/header";
import PoolCard from "./pool";
import TokenInfo from './tokenInfo/index';
import { PoolType } from "@/constants/type";
import "./index.less";

const Mining: React.FC = () => {
  const [pools, setPools] = useState<PoolType[]>([]);
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  const miningContract = useMiningContract();
  const { poolList, stakingBNB, stakingToken } = useMining(miningContract);

  useEffect(() => {
    setPools(poolList);
  }, [miningContract, poolList]);

  const checkConnectWallet = (is: boolean) => {
    setShowConnectWallet(is);
  };

  const staking = async (pool: PoolType, amount: string) => {
    if (!pool || Number(amount) <= 0) return;

    let Tx;
    if (pool.symbol === 'BNB') {
      Tx = await stakingBNB(pool.miningId, amount);
    } else {
      Tx = await stakingToken(pool.miningId, pool.tokenAddress, amount);
    }
    return Tx;
  };


  return (
    <div>
      {showConnectWallet && <ConnectWalletModal checkConnectWallet={checkConnectWallet} />}
      <Header />
      <TokenInfo />
      <ul className="miningList">
        {pools.length === 0 && <Loading />}
        {pools.map(pool => (
          <PoolCard key={pool.miningId} pool={pool} checkConnectWallet={checkConnectWallet} staking={staking} />
        ))}
      </ul>
    </div>
  );
}

export default Mining