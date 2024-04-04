// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import RadioForm, {
//   RadioButton,
//   RadioButtonInput,
//   RadioButtonLabel,
// } from 'react-native-simple-radio-button';
// import {FormGroupProps} from '../FormGroup';

// interface RadioPropType {
//   label: string;
//   value: string;
// }

// const CustomRadioInput = ({
//   placeholder,
//   label,
//   onChange,
//   name,
//   maxLength,
//   value,
//   radioProps,
// }: FormGroupProps) => {
//   return (
//     <View style={[styles.formGroup]}>
//       <Text style={styles.labelText}>{label}</Text>
//       <RadioForm
//         formHorizontal={true}
//         animation={true}
//         style={[styles.textInput]}>
//         {(radioProps || []).map((obj: RadioPropType, i) => (
//           <RadioButton
//             labelHorizontal={true}
//             key={i}
//             style={{
//               marginRight: 20,
//             }}>
//             {/*  You can set RadioButtonLabel before RadioButtonInput */}
//             <RadioButtonInput
//               obj={obj}
//               index={i}
//               isSelected={value === obj.value}
//               onPress={value => onChange(name, value)}
//               buttonInnerColor={'#088395'}
//               buttonOuterColor={value === obj.value ? '#088395' : '#000'}
//               buttonSize={15}
//               buttonOuterSize={25}
//               buttonStyle={{}}
//               buttonWrapStyle={{marginRight: 0}}
//             />
//             <RadioButtonLabel
//               obj={obj}
//               index={i}
//               labelHorizontal={true}
//               onPress={value => onChange(name, value)}
//               labelStyle={[styles.labelText, {fontSize: 16, fontWeight: '400'}]}
//               labelWrapStyle={{}}
//             />
//           </RadioButton>
//         ))}
//       </RadioForm>
//     </View>
//   );
// };

// export default CustomRadioInput;

// const styles = StyleSheet.create({
//   formGroup: {marginBottom: 18},
//   labelText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#000',
//   },
//   textInput: {
//     // borderWidth: 1,
//     // borderColor: 'gray',
//     // borderRadius: 36,
//     // paddingHorizontal: 16,
//     paddingVertical: 7,
//     // flex: 1,
//   },
// });
