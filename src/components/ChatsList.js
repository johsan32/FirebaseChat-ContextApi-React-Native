import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../context';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../utils/Routes';
import {MyFonts} from '../theme/MyFonts';
import {windowWidth} from '../utils/Dimensions';
import {MyColor} from '../theme/colors';
import moment from 'moment';
import UserImage from './ui/userImage';

const ChatstList = props => {
  const {item} = props;
  const navigation = useNavigation();
  const [{myPhoneNumber}] = appContext();
  const [chatsInfo, setChatsInfo] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [chatUserMsg, setChatUserMsg] = useState([]);

  const countIsReadMessages = chatUserMsg?.filter(
    msg => msg.isRead === false,
  ).length;

  const chatsList = async () => {
    if (item) {
      try {
        const userContactsSnapshot = await firestore()
          .collection(`Users/${myPhoneNumber}/contacts`)
          .doc(item)
          .get();
        const userContactsData = userContactsSnapshot.data();
        setChatsInfo(userContactsData);
        if (userContactsData && userContactsData.phone) {
          const userChatsSnapshot = await firestore()
            .collection(`Chats/${myPhoneNumber}/userChats`)
            .doc(userContactsData?.phone)
            .get();
          const userChatsData = userChatsSnapshot.data();
          setChatUser(userChatsData);
          if (userChatsData && userChatsData?.phone) {
            const messagesSnapshot = await firestore()
              .collection(
                `Chats/${myPhoneNumber}/userChats/${userChatsData.phone}/messages`,
              )
              .orderBy('timeSend', 'asc')
              .get();

            const messagesData = messagesSnapshot.docs.map(doc => doc.data());
            setChatsInfo(prevChatsInfo => ({
              ...prevChatsInfo,
              message: messagesData,
            }));
            setChatUserMsg(messagesData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const lastMessageIndex = chatUserMsg?.length - 1;
  const lastMessage = chatUserMsg?.[lastMessageIndex];

  const pressChatMsg = () => {
    updateAllMessages();
    navigation.navigate(Routes.USERCHAT, {
      messageInfo: chatsInfo,
      message: chatUserMsg,
    });
  };

  const updateAllMessages = async () => {
    const snapshot = await firestore()
      .collection(
        `Chats/${myPhoneNumber}/userChats/${chatUser?.phone}/messages`,
      )
      .get();
    snapshot.forEach(doc => {
      firestore()
        .collection(
          `Chats/${myPhoneNumber}/userChats/${chatUser?.phone}/messages`,
        )
        .doc(doc.id)
        .update({
          isRead: true,
        })
        .then(() => {
          console.log('belge güncellendi');
        })
        .catch(error => {
          console.error('hata oluştu:', error);
        });
    });
  };
  useEffect(() => {
    chatsList();
  }, [countIsReadMessages]);
  useEffect(() => {
    chatsList();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Pressable onPress={pressChatMsg} style={styles.container}>
        <View style={styles.imgContainer}>
          {chatsInfo?.photo ? (
            <Image
              style={styles.image}
              source={{uri: chatsInfo?.photo}}
              resizeMode="stretch"
            />
          ) : (
            <View style={[styles.nickContainer, {width: 50, height: 50}]}>
              <Text style={[styles.textNick, {fontSize: 16}]}>
                {chatsInfo?.name?.charAt(0).toUpperCase() +
                  chatsInfo?.surname?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={{paddingLeft: 10}}>
            <Text style={styles.textContact}>
              {chatsInfo?.name} {chatsInfo?.surname}
            </Text>
            <View style={styles.messageWrapper}>
              <Text style={styles.textTimestamp}>
                {moment(lastMessage?.timeSend).format('HH:mm')}
              </Text>
              <Text style={styles.textMessage}>{lastMessage?.title}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          {item?.status ? (
            <Text style={styles.onlineText}>Online</Text>
          ) : (
            <Text style={styles.onlineText}>
              {moment(item?.timeStart).format('HH:mm')}
            </Text>
          )}

          <View style={styles.rightBottom}>
            {countIsReadMessages > 0 ? (
              <View style={styles.badges}>
                <Text style={styles.textBadge}>{countIsReadMessages}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ChatstList;

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
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContact: {
    fontSize: 16,
    fontWeight: '700',
    color: MyColor.black,
    paddingLeft: 10,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: MyColor.textGrey,
  },
  messageWrapper: {
    paddingTop: 8,
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 10,
  },
  textMessage: {
    width: windowWidth * 0.4,
  },
  textTimestamp: {
    fontFamily: MyFonts.blackItalic,
    color: MyColor.grey,
  },
  onlineText: {
    fontFamily: MyFonts.fontPoppinsR,
    color: MyColor.primary,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: MyColor.tertiary,
  },
  rightContainer: {
    alignItems: 'flex-end',
    gap: 10,
    paddingRight: 7,
  },
  rightBottom: {
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'flex-end',
  },
  badges: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: MyColor.tertiary,
  },
  textBadge: {
    alignSelf: 'center',
    top: 5,
    fontFamily: MyFonts.bold,
    color: MyColor.white,
  },
  textContainer: {
    alignItems: 'center',
    gap: 5,
  },
  textRight: {
    fontSize: 14,
    fontFamily: MyFonts.fontPoppinsR,
    fontWeight: '700',
    color: MyColor.grey,
  },
  nickContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: MyColor.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNick: {
    color: MyColor.white,
    fontFamily: MyFonts.fontQuickR,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
