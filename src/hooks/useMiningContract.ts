import { useState, useEffect } from 'react'
import useMulticall from "./useMulticall"
import MiningAbi from "../constants/abi/Mining.json"
import contractsAddress from 'constants/contractsAddress'
import { getContractAddress } from '../utils/contractUtils'
import useContractUtils from 'hooks/useContractUtils'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'


export default function useMining(contract: Contract | null) {
    const [poolList, setPoolList] = useState<any[]>([]);
    const address = getContractAddress(contractsAddress.mining);
    const { multicallRequest } = useMulticall();
    const { mainChainBalance, tokenBalance } = useContractUtils()
    const { active, account } = useWeb3ReactCore();


    const pools = async () => {
        const length = await contract?.poolsLength();
        const ids = [...new Array(length.toNumber()).keys()];
        const stateCalls = ids.map((i) => ({
            address: address,
            name: 'Pools',
            params: [i],
        }))
        const list = await multicallRequest(stateCalls, MiningAbi);
        let data = [];

        for (let i = 0; i < list.length; i++) {
            const pool = list[i];
            let balance = "0";
            if (active) {
                if (pool.symbol == 'BNB') {
                    balance = await mainChainBalance();
                } else {
                    balance = await tokenBalance(pool.tokenAddress);
                }
            }
            data.push({
                symbol: pool.symbol,
                tokenAddress: pool.tokenAddress,
                miningId: pool.miningId.toNumber(),
                rate: pool.rate.toNumber(),
                stakingNum: pool.stakingNum.toNumber(),
                total: pool.total.toNumber(),
                balance
            })
        }
        setPoolList(data)
    }

    const stakeBNB = async () => {

    }

    const stakeToken = async () => {

    }



    useEffect(() => {
        pools()
    }, [contract])

    return {
        poolList,
        stakeBNB,
        stakeToken
    }
}