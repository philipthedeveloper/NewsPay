import React, {useEffect, useReducer, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import FormGroup from '../components/FormGroup';
import {useRedux} from '../hooks/useRedux';
import {fakeAuthorization, updateUserState} from '../redux/user/userSlice';
import userData from '../data/dummyUser.json';
import {loginUser, resetLoginState} from '../redux/auth/login/loginSlice';
import {useGlobalContext} from '../hooks/useGlobalContext';
import FormFeedback from '../components/forms/FormFeedback';

export interface FormDataType {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  gender?: string;
  dob?: string;
}

export const SignIn = ({navigation}: any) => {
  const {dispatch, useStateSelector} = useRedux();
  const {styleGuide} = useGlobalContext();

  // Login state
  const {isAuthenticating, isLoggedIn, loginError, loginSuccess} =
    useStateSelector(state => state.Login);
  // User state
  const {isAuthorized} = useStateSelector(state => state.User);

  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
  });

  const handleInputChange = (name: keyof FormDataType, value: string) => {
    setFormData((prev): FormDataType => {
      return {...prev, [name]: value.trim()};
    });
  };

  const navigateScreen = (to: string) => {
    navigation.navigate(to);
  };

  const authenticateFakeUser = () => {
    // dispatch(fakeAuthorization(userData));
    if (!formData.email || !formData.password) {
      return ToastAndroid.show('Please fill all fields', ToastAndroid.LONG);
    }
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      // if (loginSuccess) {
      //   return ToastAndroid.show(loginSuccess, ToastAndroid.LONG);
      // }
      console.log(loginSuccess);
      dispatch(updateUserState());
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (loginError) {
      let tmo = setTimeout(() => {
        dispatch(resetLoginState());
        clearTimeout(tmo);
      }, 1800);
    }
  }, [loginError]);
  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
      keyboardShouldPersistTaps={'always'}>
      <StatusBar
        showHideTransition={'slide'}
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Modal
        visible={isAuthenticating || (isLoggedIn && !isAuthorized)}
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size={'large'} color={styleGuide.primaryColor} />
        </View>
      </Modal>
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={require('../assets/signin-background.png')}>
        <View style={[styles.modalStyle]}>
          <Text style={[styles.welcomeText]}>Hi there!</Text>
          <FormGroup
            type="text"
            label="Email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            value={formData.email}
          />
          <FormGroup
            type="password"
            label="Password"
            name="password"
            onChange={handleInputChange}
            placeholder="Enter password"
            value={formData.password}
          />
          <View style={[styles.forgotPassContainer]}>
            <TouchableOpacity
              style={[styles.forgotPassBtn]}
              activeOpacity={0.4}>
              <Text style={[styles.forgotPassText]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {loginError && !isLoggedIn && (
            <FormFeedback type="error" content={loginError} />
          )}
          <TouchableOpacity
            style={[styles.authButton, {width: '100%'}]}
            onPress={authenticateFakeUser}>
            <Text style={[styles.authText]}>Log in</Text>
          </TouchableOpacity>
          <View style={[styles.dontHaveAccContainer]}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              style={[styles.dontHaveAccBtn]}
              activeOpacity={0.4}
              onPress={() => navigateScreen('signup')}
              disabled={isAuthenticating}>
              <Text style={[styles.dontHaveAccText]}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    textAlign: 'center',
  },

  modalStyle: {
    width: '85%',
    maxWidth: 350,
    height: '80%',
    maxHeight: 450,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  welcomeText: {
    alignSelf: 'center',
    color: '#088395',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 20,
  },

  forgotPassContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: -15,
  },
  forgotPassBtn: {},
  forgotPassText: {color: '#088395'},
  dontHaveAccContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dontHaveAccBtn: {},
  dontHaveAccText: {color: '#088395'},
});

export default SignIn;
