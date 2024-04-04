import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import FormGroup from '../components/FormGroup';
import Loader from '../components/forms/Loader';
import {useRedux} from '../hooks/useRedux';
import {useGlobalContext} from '../hooks/useGlobalContext';
import {fakeAuthorization, updateUserState} from '../redux/user/userSlice';
import {loginUser, resetLoginState} from '../redux/auth/login/loginSlice';

interface CheckinData {
  email: string;
  password: string;
}

export const CheckIn = ({navigation}: any) => {
  const {dispatch, useStateSelector} = useRedux();

  // Login state
  const {isAuthenticating, loginError, loginSuccess, isLoggedIn} =
    useStateSelector(state => state.Login);

  const [checkinData, setCheckinData] = useState<CheckinData>({
    email: '',
    password: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setCheckinData(prev => ({...prev, [name]: value}));
  };

  const navigateScreen = (to: string) => {
    navigation.navigate(to);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(updateUserState());
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (loginError) {
      ToastAndroid.show(loginError, ToastAndroid.LONG);
      let tmo = setTimeout(() => {
        dispatch(resetLoginState());
        clearTimeout(tmo);
      }, 1800);
    }
  }, [loginError]);

  const authenticateUser = () => {
    if (!checkinData.email || !checkinData.password) {
      return ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
    }
    dispatch(loginUser(checkinData));
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#1A1F24', paddingHorizontal: 19}}
      keyboardShouldPersistTaps={'always'}>
      {isAuthenticating && <Loader />}
      <View
        style={{
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/app-logo.png')}
          style={{width: 100, height: 120, objectFit: 'contain'}}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View style={{maxWidth: 300, width: '90%'}}>
          <FormGroup
            name="email"
            label="Email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            type="text"
            value={checkinData.email}
          />
          <FormGroup
            name="password"
            label="Password"
            onChange={handleInputChange}
            placeholder="Enter your password"
            type="password"
            value={checkinData.password}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#FEC226',
              borderRadius: 10,
              width: '100%',
              paddingVertical: 16,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 24,
            }}
            activeOpacity={0.7}
            onPress={authenticateUser}>
            <Text
              style={{
                color: '#1A1F24',
                fontWeight: '800',
                fontSize: 18,
                textAlign: 'center',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  onboardingText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#088395',
    textAlign: 'center',
  },

  authButton: {
    padding: 14,
    paddingHorizontal: 32,
    backgroundColor: '#088395',
    borderRadius: 36,
  },

  authText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CheckIn;
