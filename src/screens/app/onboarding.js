import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/Routes';
import LottieView from 'lottie-react-native';
import Button from '../../components/ui/button';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';
import {getStorageMyNumber} from '../../context/actions/actionUser';
import {appContext} from '../../context';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [{myPhoneNumber}, dispatch] = appContext();

  const saveMyNumber = () => {
    if (myPhoneNumber) {
      setTimeout(() => {
        navigation.navigate(Routes.TAB);
      }, 1000);
    }
  };

  useEffect(() => {
    getStorageMyNumber(dispatch);
    saveMyNumber();
  }, [myPhoneNumber]);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={{flex: 1}}>
          <View style={styles.image}>
            <LottieView
              source={require('../../assets/animations/onboarding.json')}
              style={{width: windowWidth, height: windowHeight / 3}}
              autoPlay
              loop
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.headerText}>Hello, Lets Chat</Text>
            <Text style={styles.titleText}>What are you doing today?</Text>
            <Text style={styles.titleText}>Everything is ok?</Text>
          </View>
        </View>
        <Button
          onPress={() => navigation.navigate(Routes.SINGIN)}
          disabled={myPhoneNumber ? true : false}
          text={myPhoneNumber ? 'Connecting...' : 'Sign In'}
          size={windowWidth * 0.9}
          color={myPhoneNumber ? MyColor.green : MyColor.primary}
          textColor={MyColor.white}
        />
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontFamily: MyFonts.bold,
    fontWeight: '800',
    color: MyColor.black,
    paddingBottom: 30,
  },
  titleText: {
    fontFamily: MyFonts.regular,
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10,
  },
});
