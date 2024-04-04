import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useGlobalContext} from '../hooks/useGlobalContext';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {styleGuide} = useGlobalContext();
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styleGuide.primaryColor}
      />
      <Tab.Navigator
        screenOptions={({route}: any) => ({
          headerShown: false,
          tabBarActiveTintColor: styleGuide.primaryColor,
          tabBarInactiveTintColor: '#fff',
          tabBarLabelPosition: 'below-icon',
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 13,
            marginVertical: 5,
          },
          tabBarStyle: {
            flexDirection: 'row',
            // justifyContent: 'space-around',
            // alignItems: 'center',
            // paddingVertical: 14,
            height: 70,
            // elevation: 25,
            shadowColor: styleGuide.primaryColor,
            borderBottomColor: 'transparent',
            backgroundColor: '#fff',
            borderTopWidth: 0,
          },
          tabBarIcon: ({focused, size}: any) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name="home"
                  color={focused ? styleGuide.primaryColor : '#000'}
                  size={30}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <Ionicons
                  name="settings"
                  color={focused ? styleGuide.primaryColor : '#000'}
                  size={30}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <FontAwesome
                  name="user"
                  color={focused ? styleGuide.primaryColor : '#000'}
                  size={30}
                />
              );
            }
          },
        })}
        // tabBar={props => <CustomTopTab {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
};

const CustomTopTab = ({descriptors, state, navigation, insets}: any) => {
  const {styleGuide} = useGlobalContext();
  const stateIndex = state.index;

  const handleNavigate = (to: string) => {
    navigation.navigate(to);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 14,
        // height: 65,
        elevation: 25,
        shadowColor: styleGuide.primaryColor,
        backgroundColor: styleGuide.backgroundColor,
      }}>
      <TouchableOpacity
        style={styles.bottomTabBtn}
        onPress={() => handleNavigate('Home')}>
        <Ionicons
          name="home"
          color={stateIndex === 0 ? styleGuide.primaryColor : '#fff'}
          size={16}
        />
        <Text
          style={[
            styles.bottomTabLabel,
            {color: stateIndex === 0 ? styleGuide.primaryColor : '#fff'},
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomTabBtn}
        onPress={() => handleNavigate('Settings')}>
        <FontAwesome
          name="user"
          color={stateIndex === 1 ? styleGuide.primaryColor : '#fff'}
          size={16}
        />
        <Text
          style={[
            styles.bottomTabLabel,
            {color: stateIndex === 1 ? styleGuide.primaryColor : '#fff'},
          ]}>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomTabBtn}
        onPress={() => handleNavigate('Profile')}>
        <Ionicons
          name="settings"
          color={stateIndex === 2 ? styleGuide.primaryColor : '#fff'}
          size={16}
        />
        <Text
          style={[
            styles.bottomTabLabel,
            {color: stateIndex === 2 ? styleGuide.primaryColor : '#fff'},
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  bottomTabBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomTabLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    marginTop: 5,
  },
});
