import React, {
  Children,
  PropsWithChildren,
  ReactChildren,
  useMemo,
} from 'react';
import {GlobalInterface} from './interface';

export const GlobalContext = React.createContext<GlobalInterface | null>(null);

const GlobalContextProvider = ({children}: PropsWithChildren) => {
  const styleGuide = useMemo(
    () => ({
      viewStyle: {
        backgroundColor: '#1A1F24',
        paddingHorizontal: 19,
      },
      backgroundColor: '#1A1F24',
      primaryColor: '#FEC226',
    }),
    [],
  );
  return (
    <GlobalContext.Provider value={{styleGuide}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
