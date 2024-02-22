import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firestore from '@react-native-firebase/firestore';
import {Routes} from '../utils/Routes';
import ContactsScreen from '../screens/contacts/contactsScreen';
import ChatsScreen from '../screens/chats/chatsScreen';
import ProfilScreen from '../screens/profile/profilScreen';
import {MyColor} from '../theme/colors';
import {windowWidth} from '../utils/Dimensions';
import CallScreen from '../screens/call/callScreen';
import {fetchStorageMyInfo} from '../context/actions/actionUser';
import {appContext} from '../context';
import moment from 'moment';
const Tab = createBottomTabNavigator();

function MyTabs() {
  const [{myDeviceInfo, myPhoneNumber}, dispatch] = appContext();

  const uptadeUser = () => {
    if (myPhoneNumber) {
      firestore()
        .collection('Users')
        .doc(myPhoneNumber)
        .update({
          lastEnter: moment().valueOf(),
          status: true,
        })
        .then(() => {
          console.log('User photo');
        });
    }
  };
  const getStorageUserInfo = () => {
    fetchStorageMyInfo(dispatch, myPhoneNumber);
  };

  useEffect(() => {
    uptadeUser();
    getStorageUserInfo();
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={Routes.CONTACTS}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, paddingBottom: 5},
        tabBarStyle: {
          backgroundColor: MyColor.primary,
          marginBottom: 10,
          height: 65,
          borderRadius: 15,
          width: windowWidth * 0.95,
          alignSelf: 'center',
        },
        headerShown: false,
        tabBarInactiveTintColor: MyColor.lightGrey,
        tabBarActiveTintColor: MyColor.white,
      }}>
      <Tab.Screen
        name={Routes.CONTACTS}
        component={ContactsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/contact.png')}
              tintColor={color}
              style={{width: 30, height: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.CALLS}
        component={CallScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/calls.png')}
              tintColor={color}
              style={{width: 27, height: 27}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.CHATS}
        component={ChatsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/icons/chats.png')}
              tintColor={color}
              style={{width: 34, height: 28}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.PROFIL}
        component={ProfilScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={
                myDeviceInfo?.photo
                  ? {uri: myDeviceInfo?.photo}
                  : require('../assets//images/userImage.jpeg')
              }
              style={{width: 34, height: 34, borderRadius: 100}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
