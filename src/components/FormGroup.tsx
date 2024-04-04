import React, {PropsWithChildren, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {FormDataType} from '../screens';
import Entypo from 'react-native-vector-icons/Entypo';
// import CustomRadioInput from './forms/CustomRadioInput';
import CustomDateTimePicker from './forms/CustomDateTimePicker';
import {useGlobalContext} from '../hooks/useGlobalContext';

type InputTypes = 'password' | 'text' | 'date';

export interface FormGroupProps extends PropsWithChildren {
  type: InputTypes;
  value: string;
  onChange: (name: keyof FormDataType, value: string) => void;
  label: string;
  placeholder: string;
  maxLength?: number;
  name: keyof FormDataType;
  radioProps?: Array<any>;
}

const FormGroup = (props: FormGroupProps) => {
  switch (props.type) {
    case 'text':
      return <CustomTextInput {...props} />;
    case 'password':
      return <CustomPasswordInput {...props} />;
    // case 'radio':
    //   return <CustomRadioInput {...props} />;
    case 'date':
      return <CustomDateTimePicker {...props} />;
    default:
      return <CustomTextInput {...props} />;
  }
};

const CustomTextInput = ({
  placeholder,
  label,
  onChange,
  name,
  maxLength,
  value,
}: FormGroupProps) => {
  return (
    <View style={[styles.formGroup]}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(value: string) => onChange(name, value)}
        style={styles.textInput}
        maxLength={maxLength || 100}
      />
    </View>
  );
};

const CustomPasswordInput = ({
  placeholder,
  label,
  onChange,
  name,
  maxLength,
  value,
}: FormGroupProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const {styleGuide} = useGlobalContext();

  return (
    <View style={[styles.formGroup]}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={[styles.passwordContainer]}>
        <TextInput
          placeholder={placeholder}
          onChangeText={(value: string) => onChange(name, value)}
          value={value}
          maxLength={maxLength || 100}
          secureTextEntry={isHidden}
          style={[styles.textInput, {flex: 1}]}
        />
        {isHidden ? (
          <Entypo
            name="eye-with-line"
            onPress={() => setIsHidden(false)}
            color={styleGuide.primaryColor}
            size={24}
            style={{position: 'absolute', zIndex: 100, right: 16}}
          />
        ) : (
          <Entypo
            name="eye"
            onPress={() => setIsHidden(true)}
            color={styleGuide.primaryColor}
            size={24}
            style={{position: 'absolute', zIndex: 100, right: 16}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {marginBottom: 18},
  labelText: {
    marginBottom: 15,
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '100%',
    paddingLeft: 24,
    paddingTop: 11,
    paddingBottom: 11,
    fontSize: 15,
  },

  passwordContainer: {
    position: 'relative',
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FormGroup;
