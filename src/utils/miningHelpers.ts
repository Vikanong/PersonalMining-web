import { Contract } from '@ethersproject/contracts'
import MiningAbi from "@/constants/abi/Mining.json"

export const getPools = async (contract: Contract | null) => {
  console.log(contract);
  const length = await contract?.poolsLength();
  const ids = [...new Array(length.toNumber()).keys()];
  const stateCalls = ids.map((i) => ({
    address: contract?.address,
    name: 'state',
    params: [i],
  }))

  // const data = await multicall(MiningAbi, stateCalls);

  console.log(stateCalls);
}