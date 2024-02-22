import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appContext} from '../../context';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const CallScreen = () => {
  const navigation = useNavigation();
  const [{myCalls}, dispatch] = appContext();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        imageStyle={{opacity: 0.4}}
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/chatbg.jpeg')}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Calls</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.CONTACTADD)}>
            <Image
              source={require('../../assets/icons/calls.png')}
              style={{width: 30, height: 30, tintColor: MyColor.primary}}
            />
          </TouchableOpacity>
        </View>
        {myCalls?.length === 0 ? (
          <View style={styles.image}>
            <Text style={styles.textAnime}>No call recording</Text>
            <LottieView
              source={require('../../assets/animations/chat.json')}
              style={{width: windowWidth, height: windowHeight / 3}}
              autoPlay
              loops
            />
          </View>
        ) : (
          <View style={{height: windowHeight * 0.8}}>
            <FlatList
              data={myCalls}
              keyExtractor={item => item.phone}
              renderItem={({item}) => <ContactList item={item} />}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default CallScreen;

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
