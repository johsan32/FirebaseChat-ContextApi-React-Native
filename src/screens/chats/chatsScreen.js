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
import {MyFonts} from '../../theme/MyFonts';
import ChatstList from '../../components/ChatsList';
import {Routes} from '../../utils/Routes';
import LottieView from 'lottie-react-native';
import {MyColor} from '../../theme/colors';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {getChatsList} from '../../context/actions/actionFirebase';

const ChatsScreen = () => {
  const navigation = useNavigation();
  const [{myPhoneNumber, myChatsList}, dispatch] = appContext();

  useEffect(() => {
    getChatsList(dispatch, myPhoneNumber);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Messages</Text>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.CHATADD)}>
            <Image
              source={require('../../assets/icons/contactRight.png')}
              style={{width: 21, height: 21}}
            />
          </TouchableOpacity>
        </View>
        {myChatsList?.length === 0 ? (
          <View style={styles.image}>
            <Text style={styles.textAnime}>Your message box is empty</Text>
            <LottieView
              source={require('../../assets/animations/chat.json')}
              style={{width: windowWidth / 2, height: windowHeight / 5}}
              autoPlay
              loops
            />
          </View>
        ) : (
          <FlatList
            data={myChatsList}
            keyExtractor={index => index.toString()}
            renderItem={({item}) => <ChatstList item={item} />}
          />
        )}
      </ImageBackground>
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
