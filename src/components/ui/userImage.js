import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';
import firestore from '@react-native-firebase/firestore';

const UserImage = props => {
  const {item, phoneNumber, width = 50, height = 50, fontSize = 23} = props;
  const [contactsInfo, setContactsInfo] = useState(item);
  const contactInfo = () => {
    firestore()
      .collection(`Users`)
      .doc(item?.phone || phoneNumber)
      .onSnapshot(documentSnapshot => {
        setContactsInfo(documentSnapshot.data());
      });
    setContactsInfo(null);
  };

  useEffect(() => {
    contactInfo();
  }, []);

  return (
    <View style={[styles.imageContainer, {width: width, height: height}]}>
      {contactsInfo?.photo ? (
        <Image
          style={[styles.image, {width: width, height: height}]}
          source={{uri: contactsInfo?.photo}}
          resizeMode="stretch"
        />
      ) : item?.name ? (
        <View style={[styles.nickContainer, {width: width, height: height}]}>
          <Text style={[styles.textNick, {fontSize: fontSize}]}>
            {item?.name?.charAt(0).toUpperCase() +
              item?.surname?.charAt(0).toUpperCase()}
          </Text>
        </View>
      ) : (
        <Image
          style={[styles.image, {width: width, height: height}]}
          source={require('../../assets/images/userImage.jpeg')}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nickContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: MyColor.grey,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textNick: {
    color: MyColor.white,
    fontFamily: MyFonts.fontQuickR,
    fontWeight: '700',
    letterSpacing: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    zIndex: 1,
  },
});
export default UserImage;
