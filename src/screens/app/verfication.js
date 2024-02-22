import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MyFonts} from '../../theme/MyFonts';
import {MyColor} from '../../theme/colors';
import Button from '../../components/ui/button';
import {Routes} from '../../utils/Routes';
import {windowWidth} from '../../utils/Dimensions';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import moment from 'moment';
import {
  fetchWifiStatus,
  storageDeviceMyNumber,
} from '../../context/actions/actionUser';
import {appContext} from '../../context';

const VerificationCodeScreen = ({route}) => {
  const navigation = useNavigation();
  const item = route?.params?.item;
  const [{myWifiStatus}, dispatch] = appContext();

  const securityCode = '962574';
  const refs = useRef([]);
  const setRef = (index, ref) => (refs.current[index] = ref);
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleVerificationCodeChange = (text, index) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = text;
    setVerificationCode(updatedVerificationCode);

    if (text.length === 1 && index < 5) {
      refs.current[index + 1].focus();
    }
  };
  const combinedCode = verificationCode.join('');

  const checkInternetConnection = () => {
    fetchWifiStatus(dispatch);
  };

  const handleVerification = () => {
    if (combinedCode === securityCode) {
      storageDeviceMyNumber(item);
      firestore()
        .collection('Users')
        .doc(item)
        .set({
          id: uuid.v4(),
          status: true,
          phone: item,
          name: '',
          surname: '',
          photo: '',
          isWifiStatus: myWifiStatus,
          creatAt: moment().valueOf(),
          lastEnter: moment().valueOf(),
        })
        .then(() => {
          console.log('User register!');
          navigation.replace(Routes.PROFILEDIT, {item: item});
        });
    } else {
      Alert.alert('Incorrect security code!', 'Please try again.', [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate(Routes.SPLASH),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  useEffect(() => {
    checkInternetConnection();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.body}>
          <Text style={styles.headerText}>Enter Verification Code</Text>
          <Text style={styles.titleText}>We have sent SMS to:</Text>
          <Text style={styles.phoneText}>
            {item?.replace(/.(?=.{0,3}$)/g, 'X')}
          </Text>
          <View style={styles.inputSection}>
            {verificationCode.map((value, index) => (
              <TextInput
                key={index.toString()}
                ref={ref => setRef(index, ref)}
                keyboardType="number-pad"
                placeholder="x"
                placeholderTextColor={MyColor.grey}
                style={styles.singleInput}
                onChangeText={text => handleVerificationCodeChange(text, index)}
                value={value}
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <Button
            onPress={handleVerification}
            text="Sign In"
            color={MyColor.primary}
            textColor={MyColor.white}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColor.white,
  },
  body: {
    flex: 1,
    width: windowWidth * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: MyFonts.bold,
    fontWeight: '800',
    color: MyColor.black,
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
  inputSection: {
    width: windowWidth * 0.8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleInput: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: MyColor.primary,
    margin: 5,
    color: MyColor.black,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    fontFamily: MyFonts.regular,
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
  phoneText: {
    fontFamily: MyFonts.fontQuickB,
    fontSize: 20,
    fontWeight: '500',
    color: MyColor.red,
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
});
