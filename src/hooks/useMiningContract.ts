import { useState, useEffect } from 'react'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import useMulticall from "./useMulticall"
import MiningAbi from "constants/abi/Mining.json"
import contractsAddress from 'constants/contractsAddress'
import { getContractAddress, pow18 } from '@/utils/contractUtils'

import Decimal from 'decimal.js';

export default function useMining(contract: Contract | null) {
    const [poolList, setPoolList] = useState<any[]>([]);
    const address = getContractAddress(contractsAddress.mining);
    const { multicallRequest } = useMulticall();
    const { account } = useWeb3ReactCore();


    const getPools = async () => {
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
            const total = new Decimal(pool.total.toString()).div(pow18).toFixed();
            data.push({
                symbol: pool.symbol,
                tokenAddress: pool.tokenAddress,
                miningId: pool.miningId.toNumber(),
                rate: pool.rate.toNumber(),
                stakingNum: pool.stakingNum.toNumber(),
                total
            })
        }
        setPoolList(data)
    }

    // 质押BNB
    const stakingBNB = async (miningId: number, amount: string) => {
        try {
            const value = new Decimal(amount).mul(pow18).toFixed();
            const options = { from: account, value };
            const transaction = await contract?.stakingBNB(miningId, options);
            const result = await transaction.wait();
            console.log(result.transactionHash);
            getPools();
            return result.transactionHash
        } catch (error) {
            console.log(error);
        }
    }

    // 质押Token
    const stakingToken = async (miningId: number, tokenAddress: string, amount: string) => {
        if (!address) return;
        try {
            const value = new Decimal(amount).mul(pow18).toFixed();
            const transaction = await contract?.stakingToken(miningId, tokenAddress, value);
            const result = await transaction.wait();
            console.log(result.transactionHash);
            getPools();
            return result.transactionHash
        } catch (error) {
            console.log(error);
        }
    }

    // 计算收益
    const getReward = async (miningId: number) => {
        const value = await contract?.getReward(miningId);
        const reward = new Decimal(value.toString()).div(pow18).toFixed();
        return reward;
    }

    // 领取收益
    const withdraw = async (miningId: number) => {
        try {
            const transaction = await contract?.withdraw(miningId);
            const result = await transaction.wait();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // 领取测试Token
    const receiveToken = async () => {
        try {
            const transaction = await contract?.receiveToken();
            const result = await transaction.wait();
            return result;
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPools()
    }, [])

    return {
        poolList,
        stakingBNB,
        stakingToken,
        getReward,
        withdraw,
        receiveToken
    }
}