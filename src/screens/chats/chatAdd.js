import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appContext} from '../../context';
import {MyFonts} from '../../theme/MyFonts';
import {MyColor} from '../../theme/colors';
import ContactList from '../../components/ContactList';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../utils/Routes';

const ChatAdd = () => {
  const navigation = useNavigation();
  const [{myContacts}] = appContext();

  return (
    <View>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/left.png')}
              style={{width: 15, height: 27}}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Contacts</Text>
        </View>
        <View style={{}}>
          <FlatList
            data={myContacts}
            keyExtractor={index => index.toString()}
            renderItem={({item}) => (
              <ContactList
                item={item}
                onPress={() =>
                  navigation.navigate(Routes.USERCHAT, {messageInfo: item})
                }
              />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatAdd;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: MyColor.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 15,
    marginVertical: 30,
  },
  textHeader: {
    fontSize: 26,
    fontFamily: MyFonts.black,
  },
});
