/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import GlobalContextProvider from './src/context/GlobalContext';
import Router from './src/routes';
import {useRedux} from './src/hooks/useRedux';
import {RootState} from './src/redux/root';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternet from './src/components/NoInternet';
import Overlay from './src/components/Overlay';
import {
  endAuthorization,
  getCurrentSession,
  getUser,
} from './src/redux/user/userSlice';
import {ToastAndroid} from 'react-native';

function App(): JSX.Element {
  const {dispatch, useStateSelector} = useRedux();

  const {isAuthorized, isAuthorizing, authorizationError} = useStateSelector(
    (state: RootState) => state.User,
  );
  const network = useNetInfo();

  useEffect(() => {
    dispatch(getCurrentSession());
  }, []);

  useEffect(() => {
    const startAuthorization = async () => {
      if (!isAuthorized) {
        if (
          network.isConnected &&
          network.isInternetReachable &&
          !isAuthorized
        ) {
          dispatch(getUser());
        }
      }
    };

    (() => startAuthorization())();
  }, [network]);

  // Hide splash screen after authorization
  useEffect(() => {
    if ((isAuthorized && !isAuthorizing) || authorizationError) {
      let tmo: any = setTimeout(() => {
        SplashScreen.hide();
        return clearTimeout(tmo);
      }, 100);
    }
  }, [isAuthorizing, authorizationError]);

  // Toast the authorization error unless it is *Token not provided*
  // useEffect(() => {
  //   if (authorizationError && authorizationError !== 'Token not provided') {
  //     // ToastAndroid.show(authorizationError, ToastAndroid.LONG);
  //   }
  // }, [authorizationError]);

  // if (isAuthorizing || !network) return <Overlay />;
  if (isAuthorizing && network.isConnected) return <Overlay />;

  // Show no internet if internet is not connected or reachable
  if (!network.isConnected && !network.isInternetReachable && !isAuthorized)
    return <NoInternet />;

  return <Router isAuthorized={isAuthorized} />;
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Provider>
  );
};

export default AppWrapper;
