import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {windowWidth} from '../../utils/Dimensions';
import InputText from '../../components/ui/inputText';
import {Routes} from '../../utils/Routes';
import {MyColor} from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MyFonts} from '../../theme/MyFonts';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../../context';
import moment from 'moment';
import {fetchStorageMyInfo} from '../../context/actions/actionUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserImage from '../../components/ui/userImage';

const ProfilScreen = () => {
  const [{myDeviceInfo, myPhoneNumber}] = appContext();
  const navigation = useNavigation();

  const removeStorageData = async () => {
    const keys = ['@myUserInfo', '@myNumber'];
    // try {
    //   await AsyncStorage.multiRemove(keys);
    // } catch (e) {
    //   console.log(e);
    // }
    console.log('Async Storagedan da silmek için aktif edebilirsin....', keys);
  };

  const handleLogout = () => {
    firestore()
      .collection('Users')
      .doc(myPhoneNumber)
      .update({
        logOut: moment().valueOf(),
        status: false,
        lastEnter: moment().valueOf(),
      })
      .then(() => {
        console.log('Logout');
        fetchStorageMyInfo(dispatch, myPhoneNumber);
        removeStorageData();
      });
    navigation.navigate(Routes.INTRO);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleLogout}>
              <Icon name="logout" size={32} color={MyColor.red} />
              <Text style={[styles.textIcon, {color: MyColor.red}]}>
                Logout
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate(Routes.PROFILEDIT, {})}>
              <AntDesign name="edit" size={32} color={MyColor.edit} />
              <Text style={[styles.textIcon, {color: MyColor.edit}]}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            {/* <UserImage item={userInfo} width={200} height={200} fontSize={55} /> */}
            {myDeviceInfo?.photo ? (
              <Image
                style={styles.image}
                source={{uri: myDeviceInfo?.photo}}
                resizeMode="stretch"
              />
            ) : (
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require('../../assets/images/userImage.jpeg')}
              />
            )}
          </View>
          <View style={styles.input}>
            <InputText
              value={myDeviceInfo?.name}
              title="Name"
              editable={false}
            />
            <InputText
              value={myDeviceInfo?.surname}
              title="Surname"
              editable={false}
            />
            <InputText
              value={myDeviceInfo?.description}
              title="Biography"
              editable={false}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    width: windowWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flex: 2,
  },
  input: {
    flex: 3,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    zIndex: 1,
    borderWidth: 1,
    borderColor: MyColor.lightGrey,
    backgroundColor: MyColor.white,
  },
  absolute: {
    position: 'absolute',
    bottom: 30,
    right: -10,
    zIndex: 55,
  },
  headerButton: {
    width: 90,
    alignItems: 'center',
  },
  logoutIcon: {
    width: 75,
    height: 75,
  },
  editIcon: {
    width: 75,
    height: 75,
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: MyFonts.fontPoppinsR,
  },
});
