import React from 'react';
import PublicStack from './Public';
import ProtectedStack from './Protected';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

interface RouterProps {
  isAuthorized: boolean;
}

const Router = ({isAuthorized}: RouterProps) => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={'#1A1F24'} />
      {!isAuthorized ? <PublicStack /> : <ProtectedStack />}
    </NavigationContainer>
  );
};

export default Router;
