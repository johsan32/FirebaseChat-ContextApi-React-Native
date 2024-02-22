import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {MyColor} from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconVideo from 'react-native-vector-icons/Ionicons';
import IconMetarial from 'react-native-vector-icons/MaterialIcons';
import UserImage from './ui/userImage';
import {Routes} from '../utils/Routes';

const SendHeader = ({item, route}) => {
  const navigation = useNavigation();
  const params = route?.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.TAB, {screen: Routes.CHATS, item: item})
        }>
        <Image
          source={require('../assets/icons/left.png')}
          style={{width: 15, height: 22, tintColor: MyColor.primary}}
        />
      </TouchableOpacity>
      <View style={styles.imgContainer}>
        <UserImage item={item} width={50} height={50} />
        <View style={styles.textContainer}>
          <Text style={styles.textContact}>
            {item?.name} {item?.surname}
          </Text>
          <IconMetarial
            name="online-prediction"
            size={26}
            color={item?.status ? MyColor.tertiary : MyColor.red}
          />
        </View>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <IconVideo name="videocam" size={26} color={MyColor.primary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="phone" size={26} color={MyColor.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: MyColor.white,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    flex: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  textContainer: {
    paddingLeft: 10,
  },
  textContact: {
    fontSize: 18,
    fontWeight: '800',
    color: MyColor.black,
  },
  textStatus: {},
  icon: {
    width: 26,
    height: 26,
    tintColor: MyColor.tertiary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    marginRight: 12,
  },
});
