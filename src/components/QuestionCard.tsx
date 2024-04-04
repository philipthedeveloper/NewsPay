import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useGlobalContext} from '../hooks/useGlobalContext';

export interface QuestionProps extends PropsWithChildren {
  question: string;
}

const QuestionCard = ({question}: QuestionProps) => {
  const {styleGuide} = useGlobalContext();
  return (
    <View style={[styles.cardContainer]}>
      <TouchableOpacity style={[styles.dropdownBtn]} activeOpacity={0.6}>
        <Text style={[styles.questionText]}>{question}</Text>
        <Ionicons
          name="chevron-down"
          color={styleGuide.primaryColor}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  cardContainer: {},
  dropdownBtn: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  questionText: {
    fontSize: 16,
    color: '#088395',
    fontWeight: '500',
  },
});
