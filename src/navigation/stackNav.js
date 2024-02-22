import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Routes } from '../utils/Routes';
import { MyColor } from '../theme/colors';
import IntroScreen from '../screens/app/intro';
import MyTabs from './tabNav';
import OnboardingScreen from '../screens/app/onboarding';
import SignInScreen from '../screens/app/singIn';
import VerificationCodeScreen from '../screens/app/verfication';
import ProfileEdit from '../screens/profile/profileEdit';
import ContactDetail from '../screens/contacts/contactDetail';
import ContactsAdd from '../screens/contacts/contactsAdd';
import ChatAdd from '../screens/chats/chatAdd';
import UserChatScreen from '../screens/chats/UserChatScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      initialRouteName={Routes.INTRO}
      screenOptions={{
        headerShown: false,
        statusBarColor: MyColor.primary,
      }}>
      <Stack.Screen name={Routes.INTRO} component={IntroScreen} />
      <Stack.Screen name={Routes.SPLASH} component={OnboardingScreen} />
      <Stack.Screen name={Routes.SINGIN} component={SignInScreen} />
      <Stack.Screen name={Routes.VERIFICATION} component={VerificationCodeScreen} />
      <Stack.Screen name={Routes.TAB} component={MyTabs} />
      <Stack.Screen name={Routes.PROFILEDIT} component={ProfileEdit} />
      <Stack.Screen name={Routes.CONTACTDETAIL} component={ContactDetail} />
      <Stack.Screen name={Routes.CONTACTADD} component={ContactsAdd} />
      <Stack.Screen name={Routes.CHATADD} component={ChatAdd} />
      <Stack.Screen name={Routes.USERCHAT} component={UserChatScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;
