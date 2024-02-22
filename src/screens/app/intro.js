import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {appContext} from '../../context';
import {Routes} from '../../utils/Routes';
import { saveDeviceId } from '../../context/actions/actionUser';


const IntroScreen = () => {
  const navigation = useNavigation();
  const [state, dispatch] = appContext();

  const handleSaveDeviceId = () => {
    saveDeviceId(dispatch);
    setTimeout(() => {
      navigation.navigate(Routes.SPLASH);
    }, 1000);
  };

  useEffect(() => {
    handleSaveDeviceId();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/intro.json')}
        style={{width: windowWidth, height: windowHeight / 3}}
        autoPlay
        loop
      />
      <LottieView
        source={require('../../assets/animations/loading.json')}
        style={{width: windowWidth, height: windowHeight / 3}}
        autoPlay
        loop
      />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
