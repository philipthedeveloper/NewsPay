import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FormGroup from '../components/FormGroup';
import {FormDataType} from './SignIn';
import userData from '../data/dummyUser.json';
import {useRedux} from '../hooks/useRedux';
import {fakeAuthorization} from '../redux/user/userSlice';

export const SignUp = ({navigation}: any) => {
  const {dispatch} = useRedux();

  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
  });

  const handleInputChange = (name: keyof FormDataType, value: string) => {
    setFormData((prev): FormDataType => {
      return {...prev, [name]: value};
    });
  };

  const navigateScreen = (to: string) => {
    navigation.navigate(to);
  };

  const authenticateFakeUser = () => {
    dispatch(fakeAuthorization(userData));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={[styles.viewStyle]}>
        <Text style={[styles.headingText]}>Create an account</Text>
        <Text style={[styles.getStarted]}>Let's get started</Text>
        <View style={{marginTop: 20}}>
          <FormGroup
            name={'name'}
            label={'Name'}
            placeholder="Enter your name"
            type="text"
            value={formData.name || ''}
            onChange={handleInputChange}
          />
          <FormGroup
            name={'email'}
            label={'Email'}
            placeholder="Enter your email"
            type="text"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormGroup
            type="password"
            label="Password"
            name="password"
            onChange={handleInputChange}
            placeholder="Enter password"
            value={formData.password}
          />
          <FormGroup
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleInputChange}
            placeholder="Enter password"
            value={formData.confirmPassword || ''}
          />
          <FormGroup
            type="radio"
            label="Gender"
            name="gender"
            onChange={handleInputChange}
            placeholder="Select Gender"
            value={formData.gender || ''}
            radioProps={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
          />
          <FormGroup
            type="date"
            label="Date of birth"
            name="dob"
            onChange={handleInputChange}
            placeholder="Enter Date of Birth"
            value={formData.dob || ''}
          />
          <TouchableOpacity
            style={[styles.authButton, {width: '100%'}]}
            onPress={authenticateFakeUser}>
            <Text style={[styles.authText]}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    paddingHorizontal: 19,
    paddingTop: 70,
    backgroundColor: '#fff',
    flex: 1,
  },

  headingText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#088395',
  },

  getStarted: {
    color: '#000',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
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
});

export default SignUp;
