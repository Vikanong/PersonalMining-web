import { useMulticallContract } from './useContract';
import { Interface } from '@ethersproject/abi'

export const useMulticall = async (abi: any, calls: any) => {
    const contract = useMulticallContract();
    const itf = new Interface(abi)
    const calldata = calls.map((call: any) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await contract?.aggregate(calldata).call();
    return returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))
}