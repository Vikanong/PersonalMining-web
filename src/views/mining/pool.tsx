import React, { useState, useEffect } from "react"
import { useWeb3React } from '@web3-react/core'
import ImageComponent from "@/components/ImageComponent"
import { getContractAddress } from '@/utils/contractUtils'
import contractsAddress from 'constants/contractsAddress'
import useTokenUtils from "hooks/useTokenUtils"
import { PoolType } from "@/constants/type"
import { truncation } from '@/utils'
import useMining from 'hooks/useMiningContract'
import { useMiningContract } from 'hooks/useContract'


const PoolCard: React.FC<{ pool: PoolType, checkConnectWallet: Function, staking: Function }> = ({ pool, checkConnectWallet, staking }) => {
    const [val, setVal] = useState("");
    const [reward, setReward] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { account, chainId } = useWeb3React();
    const miningContract = useMiningContract();
    const { getReward, withdraw } = useMining(miningContract);
    const contractAddress = getContractAddress(contractsAddress.mining);
    const { balance, tokenBalance, isApprove, approve } = useTokenUtils(pool.symbol !== 'BNB' ? pool.tokenAddress : '');

    const isApproved = async () => {
        if (pool.symbol === 'BNB') {
            return true;
        }
        return await isApprove(contractAddress || '');
    };

    const stakeClick = async (pool: PoolType) => {
        if (!account) {
            checkConnectWallet(true);
            return;
        }

        setDisabled(true);
        if (!(await isApproved())) {
            await approve(contractAddress || '');
        }
        const Tx = await staking(pool, val);
        setDisabled(false);
        getPoolReward();
        tokenBalance();
        return Tx;
    };

    const getPoolReward = async () => {
        const value = await getReward(pool.miningId);
        setReward(value);
    };

    const withdrawClick = async () => {
        if (Number(reward) <= 0) return;

        setDisabled(true);
        const Tx = await withdraw(pool.miningId);
        setDisabled(false);
        getPoolReward();
        return Tx;
    };

    useEffect(() => {
        getPoolReward();
        const intervalId = setInterval(() => getPoolReward(), 60 * 1000);
        return () => clearInterval(intervalId); 
    }, [account, chainId]);

    return (
        <li key={pool.miningId} className="th-card">
            <div className="content">
                <div className="icon-main">
                    <ImageComponent imageName={pool.symbol.toLowerCase()} />
                </div>
                <div className="symbol">
                    {pool.symbol}
                </div>
                <div className="rate">
                    RATE: {pool.rate}% / minute
                </div>
                <div className="total">
                    <p>Pool Staking Number: <span>{pool.stakingNum}</span></p>
                    <p>Pool Stake Total: <span>{pool.total}</span></p>
                </div>
            </div>

            <div className="operate">
                <div className="balance">
                    Balance: {truncation(balance)} {pool.symbol}
                </div>
                <div className="stake">
                    <input className="value" type="text" onChange={(e) => { setVal(e.target.value) }} />
                    <button className="staking control" onClick={() => {
                        stakeClick(pool)
                    }} disabled={disabled}>{account ? 'Staking' : 'Connect'} </button>
                </div>
                {Number(reward) > 0 && <div>
                    <button className="withdraw control" onClick={withdrawClick} disabled={disabled}>{account ? 'Withdraw' : 'Connect'} </button>
                    <p className="reward">Reward: <span>{reward}</span></p>
                </div>}


            </div>
        </li>
    )
}

export default PoolCard