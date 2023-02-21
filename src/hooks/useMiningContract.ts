import { useState, useEffect } from 'react'
import { useMiningContract } from './useContract'
import { useMulticall } from "./useMulticall"
import MiningAbi from "../constants/abi/Mining.json"
import contractsAddress from 'constants/contractsAddress'
import { getContractAddress } from '../utils/contractUtils'

export const usePoolsIds = () => {
    const [ids, setIds] = useState<any[]>([]);
    const contract = useMiningContract();
    const getIds = async () => {
        const length = await contract?.poolsLength();
        const list = [...new Array(length.toNumber()).keys()];
        setIds(list);
    }
    useEffect(() => {
        if (contract) getIds()
    }, [contract])
    return ids
}

export const usePools = (ids: number[]) => {

    console.log(ids);
    const [pools, setPools] = useState([]);
    const contract = useMiningContract();
    const address = getContractAddress(contractsAddress.mining);
    const stateCalls = ids.map((i) => ({
        address: address,
        name: 'state',
        params: [i],
    }))
    // const data = useMulticall(MiningAbi, stateCalls);

    // setPools(data)

    // const getPools = async () => {
    //     const stateCalls = ids.map((i) => ({
    //         address: address,
    //         name: 'state',
    //         params: [i],
    //     }))
    //     const state = await useMulticall(MiningAbi, stateCalls);
    // }
    useEffect(() => {
        if (contract) {
            // getPools()
        }
    }, [contract])
    return pools
}