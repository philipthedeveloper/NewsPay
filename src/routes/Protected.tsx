import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
// import BottomTabs from '../screens/BottomTabs';

const Stack = createNativeStackNavigator();

const ProtectedStack = () => {
  return (
    <>
      {/* <ToastContainer /> */}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="tabs" component={BottomTabs} /> */}
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </>
  );
};

export default ProtectedStack;
