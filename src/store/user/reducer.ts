import { ConnectionType } from '@/connection'

export interface UserState {
  selectedWallet?: ConnectionType
}

export const initialState: UserState = {
  selectedWallet: undefined,
}

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     updateSelectedWallet(state, { payload: { wallet } }) {
//       state.selectedWallet = wallet
//     },
//   }
// })