import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appContext} from '../../context';
import {fetchStorageMyInfo} from '../../context/actions/actionUser';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import InputText from '../../components/ui/inputText';
import TextHeader from '../../components/ui/textHeader';
import {Routes} from '../../utils/Routes';
import ModalProfil from '../../components/ModalProfil';
import {MyColor} from '../../theme/colors';

const ProfileEdit = ({route}) => {
  const [{myPhoneNumber, myDeviceInfo}, dispatch] = appContext();
  const item = route?.params?.item;
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(myDeviceInfo.photo);
  const [name, setName] = useState(myDeviceInfo?.name);
  const [surname, setSurname] = useState(myDeviceInfo?.surname);
  const [description, setDescription] = useState(myDeviceInfo?.description);
  const [modalVisible, setModalVisible] = useState(false);

  const imageGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setPhoto(`data:${image.mime};base64,${image.data}`);
    });
  };
  const imageCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setPhoto(`data:${image.mime};base64,${image.data}`);
    });
  };
  const storageSaveUserInfo = async value => {
    try {
      const {name, surname, myPhoneNumber, photo, description} = value;
      const userInfo = {
        name: name,
        surname: surname,
        description: description,
        photo: photo,
        phone: myPhoneNumber,
      };
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('@myUserInfo', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };
  const getStorageUserInfo = () => {
    fetchStorageMyInfo(dispatch);
  };
  const userUpdate = () => {
    firestore()
      .collection('Users')
      .doc(myPhoneNumber)
      .update({
        name: name,
        surname: surname,
        photo: photo ? photo : '',
        description: description ? description : '',
      })
      .then(() => {
        console.log('User updated!');
        const userInfo = {
          name: name,
          phone: myPhoneNumber,
          surname: surname,
          photo: photo,
          description: description,
        };
        storageSaveUserInfo(userInfo);
        getStorageUserInfo();
        navigation.navigate(Routes.TAB, {screen: Routes.CONTACTS});
      });
  };
  const userPhotoDelete = () => {
    firestore()
      .collection('Users')
      .doc(myPhoneNumber)
      .update({
        photo: photo,
      })
      .then(() => {
        console.log('User photo delete');
      });
  };

  useEffect(() => {
    if (myPhoneNumber) {
      const subscriber = firestore()
        .collection('Users')
        .doc(myPhoneNumber)
        .onSnapshot(documentSnapshot => {
          console.log('User data: ', documentSnapshot.data().description);
        });
      return () => subscriber();
    }
  }, [name, surname, photo, description, myPhoneNumber]);

  return (
    <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.TAB)}>
              <Image
                resizeMode="contain"
                style={styles.iconLeft}
                source={require('../../assets/icons/close.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={userUpdate}>
              <Image
                resizeMode="contain"
                style={styles.iconRight}
                source={require('../../assets/icons/tick.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <TextHeader title="Edit Profil" />
            {myDeviceInfo?.photo ? (
              <Image
                style={styles.image}
                source={{uri: photo}}
                resizeMode="cover"
              />
            ) : (
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require('../../assets/images/userImage.jpeg')}
              />
            )}
            <TouchableOpacity
              style={{zIndex: 55}}
              onPress={() => setModalVisible(true)}>
              <Image
                style={styles.absolute}
                source={require('../../assets/icons/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.input}>
            <InputText
              setValue={setName}
              onPress={() => setName('')}
              placeholderText="Enter full name"
              value={name}
              title="Name"
              hasIcon={true}
              editable={true}
            />
            <InputText
              setValue={setSurname}
              onPress={() => setSurname('')}
              placeholderText="Enter surname"
              value={surname}
              title="Surname"
              hasIcon={true}
              editable={true}
            />
            <InputText
              setValue={setDescription}
              onPress={() => setDescription('')}
              placeholderText="Description"
              value={description}
              title="Biography"
              hasIcon={true}
              editable={true}
            />
          </View>
        </View>
      </ImageBackground>
      {modalVisible && (
        <ModalProfil
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          imageCamera={imageCamera}
          imageGallery={imageGallery}
          setPhoto={setPhoto}
          userPhotoDelete={userPhotoDelete}
        />
      )}
    </ScrollView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    flex: 1,
    width: windowWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconLeft: {
    width: 16,
    height: 16,
    tintColor: MyColor.red,
  },
  iconRight: {
    width: 20,
    height: 27,
    tintColor: MyColor.primary,
  },
  header: {
    flex: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
  input: {
    flex: 4,
  },
  text: {},
});
