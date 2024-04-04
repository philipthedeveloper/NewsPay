import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useRedux} from '../hooks/useRedux';
import {User} from '../redux/user/interface';
import QuestionCard from '../components/QuestionCard';
import {useGlobalContext} from '../hooks/useGlobalContext';

const Home = () => {
  const {useStateSelector} = useRedux();
  const user = useStateSelector(state => state.User).user as User;
  const {firstname} = user;
  const {styleGuide} = useGlobalContext();

  return (
    <ScrollView
      style={[styles.viewStyle, styleGuide.viewStyle]}
      contentContainerStyle={{flex: 1}}>
      <View style={[styles.headerContainer]}>
        <Text style={[styles.welcomeText]}>Welcome back, {firstname}</Text>
        <Text style={[styles.communicateText]}>Communicate your feelings</Text>
      </View>
      <View style={[styles.selectionCardContainer]}>
        <QuestionCard question="How often do you feel sad?" />
        <QuestionCard question="Do you feel helpless or hopeless?" />
        <QuestionCard question="Do you have trouble sleeping?" />
        <QuestionCard question="Have you lost interest in things you enjoy doing?" />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewStyle: {
    // backgroundColor: '#088295',
    paddingHorizontal: 19,
    paddingTop: 30,
  },

  headerContainer: {},
  welcomeText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '600',
  },
  communicateText: {
    color: '#f1f1f1',
    fontSize: 20,
    marginTop: 4,
  },

  selectionCardContainer: {
    margin: 10,
    marginVertical: 20,
    marginTop: 30,
    // backgroundColor: '#fff',
    flex: 1,
    // minHeight: '80%',
    rowGap: 20,
  },
});
