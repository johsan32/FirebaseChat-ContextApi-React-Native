import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {MyColor} from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyFonts} from '../theme/MyFonts';
import {windowWidth} from '../utils/Dimensions';
import UserImage from './ui/userImage';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../context';

const ContactList = props => {
  const {item, onPress} = props;
  const [{myPhoneNumber}] = appContext();

  const contactInfo = () => {
    firestore()
      .collection(`Users`)
      .doc(item.phone)
      .onSnapshot(documentSnapshot => {
        const data = documentSnapshot.data();
        const title = data?.status;
        uptadeStatus(title);
      });
  };
  const uptadeStatus = title => {
    firestore()
      .collection(`Users/${myPhoneNumber}/contacts`)
      .doc(item?.phone)
      .update({
        status: title ? title : false,
      })
      .then(() => {
        console.log('status uptade');
      });
  };
  useEffect(() => {
    contactInfo();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <Pressable style={styles.container} onPress={onPress} item={item}>
        <View style={styles.imgContainer}>
          <UserImage item={item} width={50} height={50} />
          <View>
            <Text style={styles.textContact}>
              {item?.name} {item?.surname}
            </Text>
            <Text style={styles.textPhone}>{item?.phone} </Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.textRight,
              {color: `${item?.status ? MyColor.tertiary : MyColor.red}`},
            ]}>
            {item?.status === true ? (
              'Online'
            ) : (
              <Text style={styles.textPhone}>
                {item?.lastEnter
                  ? 'last seen:' + moment(item?.lastEnter).format('HH:mm')
                  : 'Offline'}{' '}
              </Text>
            )}
          </Text>
          <Icon
            name="online-prediction"
            size={26}
            color={item?.status ? MyColor.tertiary : MyColor.red}
          />
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 15,
    backgroundColor: MyColor.white,
    margin: 5,
    width: windowWidth * 0.92,
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  textContact: {
    fontSize: 16,
    fontWeight: '700',
    color: MyColor.black,
  },
  textPhone: {
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 7,
    color: MyColor.textGrey,
  },
  textContainer: {
    alignItems: 'flex-end',
    gap: 5,
    paddingRight: 7,
  },
  textRight: {
    fontSize: 14,
    fontFamily: MyFonts.fontPoppinsR,
    fontWeight: '700',
    color: MyColor.grey,
  },
});
