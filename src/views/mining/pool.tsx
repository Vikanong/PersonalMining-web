import React, { useState, useEffect, useContext } from "react"
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import ImageComponent from "@/components/ImageComponent"
import { getContractAddress } from '@/utils/contractUtils'
import contractsAddress from 'constants/contractsAddress'
import useTokenUtils from "hooks/useTokenUtils"
import { PoolType } from "@/constants/type"
import { truncation } from '@/utils'
import useMining from 'hooks/useMiningContract'
import { useMiningContract } from 'hooks/useContract'


const PoolCard: React.FC<{ pool: PoolType, checkModal: Function, staking: Function }> = ({ pool, checkModal, staking }) => {
    const [val, setVal] = useState("");
    const [reward, setReward] = useState("");
    const { active, account } = useWeb3ReactCore();
    const miningContract = useMiningContract();
    const { getReward, withdraw } = useMining(miningContract);
    const contractAddress = getContractAddress(contractsAddress.mining);
    const { balance, isApprove, approve } = useTokenUtils(pool.symbol !== 'BNB' ? pool.tokenAddress : '');

    const stakeClick = async (pool: PoolType) => {
        if (active) {
            if (pool.symbol != 'BNB') {
                const is = await isApprove(contractAddress || '');
                if (!is) {
                    await approve(contractAddress || '')
                }
            }
            staking(pool, val)
        } else {
            checkModal(true)
        }
    }
    const getPoolReward = async () => {
        const value = await getReward(pool.miningId);
        setReward(value)
    }

    const withdrawClick = async () => {
        if (Number(reward) > 0) {
            const Tx = await withdraw(pool.miningId);
        }
    }


    useEffect(() => {
        getPoolReward()
    }, [pool.tokenAddress])

    return (
        <li key={pool.miningId} className="th-card">
            <div className="content">
                <ImageComponent imageName={pool.symbol.toLowerCase()} />
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
                    <button className="staking" onClick={() => {
                        stakeClick(pool)
                    }}>{active ? 'Staking' : 'Connect'} </button>
                </div>
                {Number(reward) > 0 && <button className="withdraw" onClick={withdrawClick}>{active ? 'Withdraw' : 'Connect'} </button>}

                {/* {reward} */}
            </div>
        </li>
    )
}

export default PoolCard