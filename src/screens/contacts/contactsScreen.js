import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {appContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import ContactList from '../../components/ContactList';
import {MyFonts} from '../../theme/MyFonts';
import {MyColor} from '../../theme/colors';
import {Routes} from '../../utils/Routes';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {fetchContactList} from '../../context/actions/actionFirebase';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [{myPhoneNumber, myContacts}, dispatch] = appContext();

  useEffect(() => {
    fetchContactList(dispatch, myPhoneNumber);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Contacts</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.CONTACTADD)}>
            <Image
              source={require('../../assets/icons/add-user.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
        {myContacts?.length === 0 ? (
          <View style={styles.image}>
            <Text style={styles.textAnime}>Add Contact Number</Text>
            <LottieView
              source={require('../../assets/animations/contact.json')}
              style={{width: windowWidth, height: windowHeight / 3}}
              autoPlay
              loops
            />
          </View>
        ) : (
          <View style={{height: windowHeight * 0.8}}>
            <FlatList
              data={myContacts}
              keyExtractor={item => item.phone}
              renderItem={({item}) => (
                <ContactList
                  item={item}
                  onPress={() =>
                    navigation.navigate(Routes.CONTACTDETAIL, {item: item})
                  }
                />
              )}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: MyColor.background,
  },
  textAnime: {
    color: MyColor.background,
    fontFamily: MyFonts.fontPoppinsR,
    fontSize: 26,
  },
  image: {
    height: windowHeight * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  textHeader: {
    fontSize: 26,
    fontFamily: MyFonts.fontPoppinsR,
    fontWeight: '600',
  },
});
