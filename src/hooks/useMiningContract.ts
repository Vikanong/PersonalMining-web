import { useState, useEffect } from 'react'
import { useMiningContract } from './useContract'
import useMulticall from "./useMulticall"
import MiningAbi from "../constants/abi/Mining.json"
import contractsAddress from 'constants/contractsAddress'
import { getContractAddress } from '../utils/contractUtils'
import { Contract } from '@ethersproject/contracts'

export default function useMining(contract: Contract | null) {
    const [poolList, setPoolList] = useState([]);
    const address = getContractAddress(contractsAddress.mining);
    const { multicallRequest } = useMulticall();

    const pools = async () => {
        const length = await contract?.poolsLength();
        const ids = [...new Array(length.toNumber()).keys()];
        const stateCalls = ids.map((i) => ({
            address: address,
            name: 'Pools',
            params: [i],
        }))
        const list = await multicallRequest(stateCalls, MiningAbi);
        const data = list.map((pool: any) => {
            return {
                symbol: pool.symbol,
                tokenAddress: pool.tokenAddress,
                miningId: pool.miningId.toNumber(),
                rate: pool.rate.toNumber(),
                stakingNum: pool.stakingNum.toNumber(),
                total: pool.total.toNumber(),
            }
        })
        setPoolList(data)
    }

    useEffect(() => {
        pools()
    }, [contract])

    return {
        poolList
    }
}