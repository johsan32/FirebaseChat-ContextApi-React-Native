import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../context';
import {windowWidth} from '../utils/Dimensions';
import {MyColor} from '../theme/colors';
import {MyFonts} from '../theme/MyFonts';
import moment from 'moment';

const SendBalloon = ({item, messageInfo}) => {
  const [{myPhoneNumber}] = appContext();

  const getMsg = async () => {
    if (messageInfo) {
      const messagesSnapshot = await firestore()
        .collection(
          `Chats/${myPhoneNumber}/userChats/${messageInfo?.phone}/messages`,
        )
        .orderBy('timeSend', 'asc')
        .get();
      const messagesData = messagesSnapshot.docs.map(doc => doc.data());
      console.log('message', messagesData.isRead);
    }
  };

  useEffect(() => {
    getMsg;
  }, []);

  return (
    <ScrollView style={{}}>
      <View
        style={[
          styles.container,
          item.type === 'receiver' ? styles.right : styles.left,
        ]}>
        <View style={styles.inputContainer}>
          <Text style={styles.textBox}>{item?.title}</Text>
          <View style={styles.rightContainer}>
            <Text style={styles.time}>
              {moment(item?.timeSend).format('HH:mm')}
            </Text>
            {item?.type === 'sender' && messageInfo?.status === true ? (
              <Image
                style={
                  item?.isRead === true ? styles.iconTrue : styles.iconFalse
                }
                resizeMode="contain"
                source={require('../assets/icons/doubleClick.png')}
              />
            ) : messageInfo?.status === false ? (
              <Image
                style={styles.iconFalse}
                resizeMode="contain"
                source={require('../assets/icons/tick.png')}
              />
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SendBalloon;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 7,
    width: windowWidth * 0.7,
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: 8,
  },
  right: {
    alignSelf: 'flex-start',
    backgroundColor: MyColor.lightGrey,
  },
  left: {
    alignSelf: 'flex-end',
    backgroundColor: MyColor.leftBallon,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  textBox: {
    alignItems: 'center',
    paddingLeft: 10,
    color: MyColor.black,
    fontFamily: MyFonts.fontPoppinsR,
    fontSize: 16,
    width: '80%',
  },
  rightContainer: {
    //flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    height: '100%',
  },
  time: {
    color: MyColor.background,
    fontFamily: MyFonts.bold,
  },
  iconTrue: {
    tintColor: MyColor.green,
    width: 15,
    height: 10,
  },
  iconFalse: {
    tintColor: MyColor.grey,
    width: 15,
    height: 10,
  },
});
