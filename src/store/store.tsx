import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface AppState {
  showConnectWallet: boolean;
  count: number;
}

const initialState: AppState = {
  showConnectWallet: false,
  count: 0
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
// type ContextType = {
//   state: State;
//   dispatch: React.Dispatch<Action>;
// };

const Context = createContext<{} | undefined>(undefined);

function useStore() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}

interface Props {
  children?: ReactNode
}

function StoreProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export { useStore, StoreProvider };