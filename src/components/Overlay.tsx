import {GlobalInterface} from '../context/interface';
import {useGlobalContext} from '../hooks/useGlobalContext';
import {View, StatusBar, ActivityIndicator, Image} from 'react-native';

const Overlay = () => {
  const {styleGuide} = useGlobalContext() as GlobalInterface;
  return (
    <View
      style={[
        styleGuide.viewStyle,
        {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
      ]}>
      <StatusBar
        backgroundColor={styleGuide?.backgroundColor}
        barStyle={'light-content'}
      />
      {/* <ActivityIndicator size={'large'} color={'red'} /> */}
      <Image
        source={require('../assets/spinner-200-with-bg.gif')}
        style={{objectFit: 'contain', width: 70, height: 70}}
      />
    </View>
  );
};

export default Overlay;
