import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {appContext} from '../../context';
import Icon from 'react-native-vector-icons/Ionicons';
import IconChat from 'react-native-vector-icons/MaterialCommunityIcons';
import IconPlus from 'react-native-vector-icons/Entypo';
import {MyColor} from '../../theme/colors';
import SendBalloon from '../../components/sendBalloon';
import SendHeader from '../../components/sendHeader';
import moment from 'moment';

const UserChatScreen = ({route}) => {
  const [{myPhoneNumber}] = appContext();
  const {messageInfo} = route?.params;
  const [messageText, setMessageText] = useState('');
  const [userChatMessages, setUserChatMessages] = useState([]);

  const addChat = () => {
    const friendChat = {
      phone: messageInfo?.phone,
      name: messageInfo?.name,
      surname: messageInfo?.surname,
      photo: messageInfo?.photo,
      isRead: false,
      timeStart: moment().valueOf(),
      type: 'receiver',
    };
    firestore()
      .collection(`Chats/${myPhoneNumber}/userChats`)
      .doc(messageInfo?.phone)
      .set(friendChat)
      .then(() => {
        console.log('doc cat successfully');
      })
      .catch(error => {
        console.error('Error adding contact:', error);
      });
  };

  const senderMessage = () => {
    const addMessage = {
      title: messageText,
      timeSend: moment().valueOf(),
      type: 'sender',
      isRead: false,
    };
    firestore()
      .collection(
        `Chats/${myPhoneNumber}/userChats/${messageInfo?.phone}/messages`,
      )
      .add(addMessage)
      .then(() => {
        console.log('User added!');
        setMessageText('');
        receiverMessage(addMessage);
      })
      .catch(error => {
        console.error('Error adding message:', error);
      });
  };
  const receiverMessage = addMessage => {
    const form = {
      title: addMessage.title,
      timeSend: addMessage.timeSend,
      type: 'receiver',
      isRead: false,
    };
    firestore()
      .collection(
        `Chats/${messageInfo?.phone}/userChats/${myPhoneNumber}/messages`,
      )
      .add(form)
      .then(() => {
        console.log('receiver add');
      })
      .catch(error => {
        console.error('Error adding message:', error);
      });
  };

  const getMessageData = () => {
    firestore()
      .collection(
        `Chats/${myPhoneNumber}/userChats/${messageInfo?.phone}/messages`,
      )
      .orderBy('timeSend', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push(documentSnapshot.data());
        });
        setUserChatMessages(messages);
      });
  };

  useEffect(() => {
    addChat();
    getMessageData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/images/chatbg.jpeg')}
        resizeMode={'cover'}>
        <View>
          <SendHeader item={messageInfo} />
        </View>
        <View style={{flex: 1, paddingBottom: 15}}>
          <FlatList
            data={userChatMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <SendBalloon item={item} messageInfo={messageInfo} />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => console.log()}>
            <IconPlus name="plus" size={26} color={MyColor.primary} />
          </TouchableOpacity>
          <TextInput
            onChangeText={text => setMessageText(text)}
            value={messageText}
            onSubmitEditing={senderMessage}
            style={styles.textBox}
          />
          {messageText === '' && (
            <TouchableOpacity
              onPress={() => console.log()}
              style={styles.mediaButton}>
              <Icon name="camera" size={26} color={MyColor.primary} />
            </TouchableOpacity>
          )}

          {messageText === '' && (
            <TouchableOpacity
              onPress={() => console.log()}
              style={styles.mediaButton}>
              <IconChat
                name="microphone-outline"
                size={26}
                color={MyColor.primary}
              />
            </TouchableOpacity>
          )}
          {messageText !== '' && (
            <TouchableOpacity
              onPress={senderMessage}
              style={styles.mediaButton}>
              <IconChat name="send-circle" size={30} color={MyColor.primary} />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: MyColor.white,
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: MyColor.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
});

export default UserChatScreen;
