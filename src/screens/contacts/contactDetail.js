import {
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
import InputText from '../../components/ui/inputText';
import firestore from '@react-native-firebase/firestore';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import TextHeader from '../../components/ui/textHeader';
import data from '../../constants/Countries';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';
import {Routes} from '../../utils/Routes';
import Button from '../../components/ui/button';
import UserImage from '../../components/ui/userImage';
import {appContext} from '../../context';
import {fetchContactList} from '../../context/actions/actionFirebase';

const ContactDetail = ({route}) => {
  const {item} = route?.params;
  const [{myPhoneNumber, myContacts}, dispatch] = appContext();
  const navigation = useNavigation();
  const [name, setName] = useState(item?.name);
  const [surname, setSurname] = useState(item?.surname);
  const [phoneNumber, setPhoneNumber] = useState(item?.phoneNumber);
  const [description, setDescription] = useState(item?.description);
  const defaultFlag = data.find(obj => obj.flag === item?.flag).flag;
  const [flag, setFlag] = useState(defaultFlag);

  const editContact = () => {
    firestore()
      .collection(`Users/${myPhoneNumber}/contacts`)
      .doc(item?.phone)
      .update({
        name: name,
        surname: surname,
        description: description,
      })
      .then(() => {
        console.log('User updated!');
        fetchContactList(dispatch, myPhoneNumber);
        navigation.navigate(Routes.TAB, {screen: Routes.CONTACTS});
      });
  };
  const deleteContact = async () => {
    await firestore()
      .collection(`Users/${myPhoneNumber}/contacts`)
      .doc(item?.phone)
      .delete()
      .then(() => {
        console.log('User deleted!');
        fetchContactList(dispatch, myPhoneNumber);
        navigation.navigate(Routes.TAB, {screen: Routes.CONTACTS});
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

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
          <TextHeader title="Edit Contact" />
          <TouchableOpacity onPress={editContact}>
            <Image
              resizeMode="contain"
              style={styles.iconRight}
              source={require('../../assets/icons/tick.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <UserImage item={item} width={150} height={150} fontSize={48} />
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 32, marginLeft: 10}}>{flag}</Text>
                <Text style={{fontSize: 20, marginLeft: 10}}>
                  {item?.phoneCity}
                </Text>
              </View>
            </View>
            <View style={styles.inputInside}>
              <TextInput
                value={phoneNumber}
                editable={false}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor={MyColor.grey}
                style={styles.textInput}
                onChangeText={text => setPhoneNumber(text)}
              />
            </View>
          </View>
          <InputText
            setValue={setDescription}
            onPress={() => setDescription('')}
            placeholderText="Description"
            value={description}
            title="Description"
            multiline={true}
            hasIcon={true}
            editable={true}
          />
        </View>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <Button
            onPress={deleteContact}
            text="Delete"
            size={windowWidth * 0.9}
            color={MyColor.red}
            textColor={MyColor.white}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ContactDetail;

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
  },
  iconRight: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    marginBottom: 25,
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
    fontSize: 18,
    marginLeft: 10,
    fontFamily: MyFonts.regular,
    fontWeight: '700',
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
    marginRight: 25,
  },
});
