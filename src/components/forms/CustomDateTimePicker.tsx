import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FormGroupProps} from '../FormGroup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDateTimePicker = ({
  label,
  onChange,
  name,
  value,
}: FormGroupProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: string) => {
    onChange(name, new Date(date).toLocaleDateString());
    hideDatePicker();
  };

  return (
    <View style={[styles.formGroup]}>
      <Text style={styles.labelText}>{label}</Text>
      <TouchableOpacity style={[styles.textInput]} onPress={showDatePicker}>
        <Text style={[styles.placeholderText]}>{value || 'mm/dd/yyyy'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date: any) => handleConfirm(date)}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  formGroup: {marginBottom: 18},
  labelText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 36,
    paddingHorizontal: 16,
    paddingVertical: 14,
    // flex: 1,
  },

  placeholderText: {
    color: 'gray',
    fontSize: 14,
  },
});
