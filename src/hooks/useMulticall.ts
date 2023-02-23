import { useState, useEffect } from 'react'
import { useMulticallContract } from './useContract'
import { Interface } from '@ethersproject/abi'

export default function useMulticall() {
    const contract = useMulticallContract();
    async function multicallRequest(calls: any, abi: any) {
        const itf = new Interface(abi);
        let result = [];
        const calldata = calls.map((call: any) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
        const { returnData } = await contract?.aggregate(calldata);
        result = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call));
        return result;
    }
    return { multicallRequest }
}