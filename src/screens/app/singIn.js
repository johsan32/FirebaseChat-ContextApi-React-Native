import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import data from '../../constants/Countries';
import {windowWidth} from '../../utils/Dimensions';
import {MyFonts} from '../../theme/MyFonts';
import {MyColor} from '../../theme/colors';
import Button from '../../components/ui/button';
import ModalCityList from '../../components/ModalCityList';
import {Routes} from '../../utils/Routes';
import {Toast} from 'toastify-react-native';
import {appContext} from '../../context';
import {fetchUserList} from '../../context/actions/actionFirebase';
import {fetchStorageMyInfo} from '../../context/actions/actionUser';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [{usersList}, dispatch] = appContext();
  const defaultFlag = data.find(obj => obj.name === 'Turkey').flag;
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(defaultFlag);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneCity, setPhoneCity] = useState('+90');
  const phoneNumber = phoneCity + value;

  const getUserList = () => {
    fetchUserList(dispatch);
  };

  const handleSignUp = () => {
    if (!usersList?.includes(phoneNumber)) {
      Toast.success('New user created!');
      navigation.navigate(Routes.VERIFICATION, {item: phoneNumber});
    } else if (usersList?.includes(phoneNumber)) {
      Alert.alert('Registered user!', 'Log in with different number');
    } else {
      navigation.navigate(Routes.INTRO);
    }
  };
  useEffect(() => {
    getUserList();
    fetchStorageMyInfo(dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.body}>
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.titleText}>
            We will send an SMS message to verify your phone number (carrier
            charges may apply)
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.textHead}>Phone Number</Text>
            <View style={styles.inputSection}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 35, marginLeft: 10, flexDirection: 'row'}}>
                  {flag}
                </Text>
                <Text
                  style={{fontSize: 25, marginLeft: 10, flexDirection: 'row'}}>
                  {phoneCity}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              value={value}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor={MyColor.textGrey}
              style={styles.textInput}
              onChangeText={text => setValue(text)}
            />
          </View>
        </View>

        <View style={{marginBottom: 10}}>
          <Button
            onPress={handleSignUp}
            text="Sign In"
            color={MyColor.primary}
            textColor={MyColor.white}
          />
          <Text style={styles.textFooter}>
            Don’t have an account? <Text style={styles.textBold}>Sign up</Text>
          </Text>
        </View>
        {modalVisible && (
          <ModalCityList
            setModalVisible={setModalVisible}
            setPhoneCity={setPhoneCity}
            setFlag={setFlag}
            modalVisible={modalVisible}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColor.white,
  },
  body: {
    flex: 1,
    marginHorizontal: 20,
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
  titleText: {
    fontFamily: MyFonts.regular,
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  textFooter: {
    fontFamily: MyFonts.regular,
    fontSize: 16,
    textAlign: 'center',
  },
  textBold: {
    fontFamily: MyFonts.bold,
    fontSize: 18,
    fontWeight: '700',
    color: MyColor.blueSecond,
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 10,
    borderColor: MyColor.primary,
    flexDirection: 'row',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 2,
    paddingRight: 15,
    borderRightColor: MyColor.primary,
  },
  textHead: {
    position: 'absolute',
    backgroundColor: MyColor.white,
    paddingHorizontal: 10,
    top: -15,
    left: 20,
    zIndex: 5,
    color: MyColor.black,
    fontSize: 18,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    marginLeft: 10,
  },
});
