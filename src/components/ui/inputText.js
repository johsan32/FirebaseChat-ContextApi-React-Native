import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';

const InputText = props => {
  const {
    onPress,
    setValue,
    placeholderText,
    value,
    title,
    type,
    hasIcon,
    editable = false,
  } = props;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.textHead}>{title}</Text>
      <View style={styles.inputSection}>
        <TextInput
          value={value}
          keyboardType={type ? type : 'default'}
          placeholder={placeholderText}
          placeholderTextColor={MyColor.grey}
          style={styles.textInput}
          onChangeText={text => setValue(text)}
          editable={editable}
        />
        {hasIcon && (
          <TouchableOpacity onPress={onPress}>
            <Image
              resizeMode="contain"
              style={styles.iconInput}
              source={require('../../assets/icons/close.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputContainer: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 5,
    backgroundColor: MyColor.white,
    borderColor: MyColor.primary,
    flexDirection: 'row',
    marginBottom: 30,
  },
  inputSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconInput: {
    width: 16,
    height: 16,
    marginRight: 15,
    tintColor: MyColor.primary,
  },
  textHead: {
    position: 'absolute',
    backgroundColor: 'rgb(250,249,250)',
    paddingHorizontal: 10,
    top: -17,
    left: 20,
    zIndex: 5,
    color: MyColor.textColor,
    fontSize: 16,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: MyColor.black,
    fontFamily: MyFonts.fontPoppinsR,
    marginLeft: 10,
    width: '80%',
  },
});
