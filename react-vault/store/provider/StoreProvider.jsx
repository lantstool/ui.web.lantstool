import { createContext, useContext } from 'react';

export const StoreContext = createContext({});

export const StoreProvider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export const useStoreContext = () => useContext(StoreContext);
