import React, { useReducer, createContext, useContext, ReactNode } from 'react';


// interface AppState {
//   showConnectWallet: boolean;
//   count: number;
// }

// const initialState: AppState = {
//   showConnectWallet: false,
//   count: 0
// };

// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       throw new Error();
//   }
// }
// // type ContextType = {
// //   state: State;
// //   dispatch: React.Dispatch<Action>;
// // };

// const Context = createContext<{} | undefined>(undefined);

// function useStore() {
//   const context = useContext(Context);
//   if (!context) {
//     throw new Error('useGlobal must be used within a GlobalProvider');
//   }
//   return context;
// }

interface Props {
  children?: ReactNode
}

// function StoreProvider({ children }: Props) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <Context.Provider value={{ state, dispatch }}>
//       {children}
//     </Context.Provider>
//   );
// }

// export { useStore, StoreProvider };



type State = {
  showConnectWallet: boolean;
  count: number;
};

type Action = { type: 'SHOW_CONNECT_WALLET' } | { type: 'HIDE_CONNECT_WALLET' } | { type: 'INCREMENT_COUNT' } | { type: 'DECREMENT_COUNT' };

type GlobalContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW_CONNECT_WALLET':
      return { ...state, showConnectWallet: true };
    case 'HIDE_CONNECT_WALLET':
      return { ...state, showConnectWallet: false };
    case 'INCREMENT_COUNT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT_COUNT':
      return { ...state, count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type`);
  }
};

const GlobalProvider: React.FC = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    showConnectWallet: false,
    count: 0,
  });

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }

  return context;
};

export { GlobalProvider, useGlobal };