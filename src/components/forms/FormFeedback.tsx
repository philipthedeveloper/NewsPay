import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface FormFeedBackProps extends PropsWithChildren {
  type: 'success' | 'error' | 'info';
  content: string | number;
}

const colorSet = {
  success: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    borderColor: 'rgba(0, 255, 0, 0.6)',
  },
  error: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderColor: 'rgba(255, 0, 0, 0.6)',
  },
  info: {
    backgroundColor: 'rgba(0, 0, 255, 0.3)',
    borderColor: 'rgba(0, 0, 255, 0.6)',
  },
};

const FormFeedback = ({type, content}: FormFeedBackProps) => {
  return (
    <View style={[styles.container, colorSet[type]]}>
      <Text style={[styles.textStyle]}>{content}</Text>
    </View>
  );
};

export default FormFeedback;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    marginVertical: 10,
  },

  textStyle: {
    color: '#f1f1f1',
    fontSize: 12,
    fontWeight: '400',
  },
});
