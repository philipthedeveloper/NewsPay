import {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext';
import {GlobalInterface} from '../context/interface';

export const useGlobalContext = (): GlobalInterface =>
  useContext(GlobalContext as React.Context<GlobalInterface>);
