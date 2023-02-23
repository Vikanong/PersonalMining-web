import React, { useState, useEffect, useContext } from "react"
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import ImageComponent from "@/components/ImageComponent"
import { truncation } from '@/utils'


interface Pool {
    balance: string,
    miningId: number,
    rate: number,
    stakingNum: number,
    symbol: string,
    tokenAddress: string,
    total: number
}

const Pool: React.FC<{ pool: Pool, checkModal: Function }> = ({ pool, checkModal }) => {
    const [val, setVal] = useState("");

    const { active, account } = useWeb3ReactCore();

    const stakeClick = async (pool: any) => {
        if (active) {
            console.log(val);
            if (pool.symbol == "BNB") {

            }

        } else {
            checkModal(true)
        }
    }

    const inputChange = (value: string) => {
        setVal(value)
    }

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
            </div>

            <div className="operate">
                <input className="value" type="text" onChange={(e) => inputChange(e.target.value)} />
                <button className="stake" onClick={() => {
                    stakeClick(pool)
                }}>{active ? 'Stake' : 'Connect'} </button>

                <div className="balance">
                    Balance: {truncation(pool.balance)} {pool.symbol}
                </div>
            </div>
        </li>
    )
}

export default Pool