import React from 'react';
import {Modal, View, Image, StatusBar} from 'react-native';

const Loader = () => {
  return (
    <Modal transparent={true} style={{flex: 1}}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#1A1F24b3',
          },
        ]}>
        {/* <ActivityIndicator size={'large'} color={'red'} /> */}
        <Image
          source={require('../../assets/spinner-200.gif')}
          style={{objectFit: 'contain', width: 70, height: 70}}
        />
      </View>
    </Modal>
  );
};

export default Loader;
