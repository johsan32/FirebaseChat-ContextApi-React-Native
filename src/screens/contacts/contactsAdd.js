import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../../context';
import InputText from '../../components/ui/inputText';
import ModalCityList from '../../components/ModalCityList';
import {Toast} from 'toastify-react-native';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import TextHeader from '../../components/ui/textHeader';
import data from '../../constants/Countries';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';
import {Routes} from '../../utils/Routes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchContactList} from '../../context/actions/actionFirebase';

const ContactsAdd = () => {
  const [{myPhoneNumber, myContacts}, dispatch] = appContext();
  const navigation = useNavigation();
  const [contactsInfo, setContactsInfo] = useState(null);
  const [photo, setPhoto] = useState(
    contactsInfo?.photo ? contactsInfo?.photo : null,
  );
  const [name, setName] = useState(
    contactsInfo?.name ? contactsInfo?.name : null,
  );
  const [surname, setSurname] = useState(
    contactsInfo?.surname ? contactsInfo?.surname : null,
  );
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [description, setDescription] = useState(
    contactsInfo?.description ? contactsInfo?.description : null,
  );
  const defaultFlag = data.find(obj => obj.name === 'Turkey').flag;
  const [flag, setFlag] = useState(defaultFlag);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneCity, setPhoneCity] = useState('+90');
  const [numberList, setNumberList] = useState({});
  const contactNumber = phoneCity + phoneNumber;

  const [isLoading, setIsLoading] = useState(false);
  const addContact = () => {
    if (!phoneNumber) {
      Toast.error('Add phone number.');
      return;
    }
    if (numberList?.includes(contactNumber)) {
      Toast.error('Registered number.');
      return;
    }
    const friend = {
      name: name,
      surname: surname,
      photo: photo,
      description: description,
      phoneNumber: phoneNumber,
      phone: contactNumber,
      status: contactsInfo?.status ? contactsInfo?.status : false,
      flag: flag,
      phoneCity: phoneCity,
      lastEnter: contactsInfo?.lastEnter ? contactsInfo?.lastEnter : '',
      type: 'receiver',
    };
    firestore()
      .collection(`Users/${myPhoneNumber}/contacts`)
      .doc(contactNumber)
      .set(friend)
      .then(() => {
        console.log('Contact added successfully');
        setName('');
        setSurname('');
        setPhoto('');
        setPhoneNumber('');
        setDescription('');
        fetchContactList(dispatch, myPhoneNumber);
        navigation.navigate(Routes.TAB);
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };
  const getContactnfo = () => {
    contactAddInfo();
  };
  const contactAddInfo = () => {
    if (phoneNumber && contactNumber) {
      setIsLoading(true);
      firestore()
        .collection(`Users`)
        .doc(contactNumber)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          setContactsInfo(data);
          setName(data?.name || '');
          setSurname(data?.surname || '');
          setPhoto(data?.photo || '');
          setDescription(data?.description || '');
          fetchContactList(dispatch, myPhoneNumber);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } else {
      Alert.alert('Warning', 'enter number');
    }
  };

  useEffect(() => {
    const numberRegistered = myContacts?.map(item => item?.phone);
    setNumberList(numberRegistered);
  }, []);
  return (
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
          <TextHeader title="Add Contact" />
          <TouchableOpacity onPress={addContact}>
            <Image
              resizeMode="contain"
              style={styles.iconRight}
              source={require('../../assets/icons/tick.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          {/* <UserImage phoneNumber={contactNumber} width={150} height={150} fontSize={44}/> */}
          {contactsInfo?.photo ? (
            <Image
              style={[styles.image, {width: 150, height: 150}]}
              source={{uri: contactsInfo?.photo}}
              resizeMode="stretch"
            />
          ) : contactsInfo?.name ? (
            <View style={[styles.nickContainer, {width: 150, height: 150}]}>
              <Text style={[styles.textNick, {fontSize: 48}]}>
                {contactsInfo?.name?.charAt(0).toUpperCase() +
                  contactsInfo?.surname?.charAt(0).toUpperCase()}
              </Text>
            </View>
          ) : (
            <Image
              style={[styles.image, {width: 150, height: 150}]}
              source={require('../../assets/images/userImage.jpeg')}
            />
          )}
        </View>
        <View style={styles.input}>
          <InputText
            setValue={setName}
            onPress={() => setName('')}
            placeholderText="Enter name"
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
          <View style={styles.inputContainer}>
            <Text style={styles.textHead}>Phone Number</Text>
            <View style={styles.inputSection}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 32, marginLeft: 10}}>{flag}</Text>
                <Text style={{fontSize: 20, marginLeft: 10}}>{phoneCity}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputInside}>
              <TextInput
                value={phoneNumber}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor={MyColor.grey}
                style={styles.textInput}
                onChangeText={text => setPhoneNumber(text)}
              />

              <TouchableOpacity onPress={getContactnfo}>
                {isLoading ? (
                  <ActivityIndicator
                    style={styles.activeIndicator}
                    size="large"
                  />
                ) : phoneNumber ? (
                  <Icon
                    name="person-search"
                    size={32}
                    color={MyColor.primary}
                    style={styles.iconVector}
                  />
                ) : (
                  <Image
                    resizeMode="contain"
                    style={styles.iconInput}
                    source={require('../../assets/icons/close.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <InputText
            hasIcon={true}
            editable={true}
            setValue={setDescription}
            onPress={() => setDescription('')}
            placeholderText="Description"
            value={description}
            title="Description"
          />
        </View>
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
  );
};

export default ContactsAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    alignItems: 'center',
  },
  iconContainer: {
    width: windowWidth * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iconLeft: {
    width: 20,
    height: 20,
    tintColor: MyColor.primary,
  },
  iconRight: {
    width: 24,
    height: 24,
    tintColor: MyColor.green,
  },
  imageContainer: {
    marginBottom: 25,
  },
  nickContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: MyColor.white,
  },
  textNick: {
    position: 'absolute',
    alignItems: 'center',
    top: '25%',
    left: '25%',
    fontSize: 54,
    color: MyColor.background,
    fontFamily: MyFonts.bold,
    letterSpacing: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 1,
  },
  absolute: {
    position: 'absolute',
    bottom: 30,
    right: -10,
    zIndex: 55,
  },
  inputContainer: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: MyColor.white,
    borderColor: MyColor.background,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 0.5,
    paddingRight: 15,
    paddingVertical: 10,
    borderRightColor: MyColor.background,
  },
  textHead: {
    position: 'absolute',
    backgroundColor: MyColor.white,
    paddingHorizontal: 10,
    top: -15,
    left: 20,
    zIndex: 5,
    color: MyColor.background,
    fontSize: 18,
  },
  textInput: {
    fontSize: 16,
    marginLeft: 10,
  },
  inputInside: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconInput: {
    width: 16,
    height: 16,
    marginRight: 15,
    tintColor: MyColor.primary,
  },
  iconVector: {
    marginRight: 5,
  },
});
