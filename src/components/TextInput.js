//import liraries
import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import {MyColor} from '../theme/colors';

const CustomTextInput = ({
  value,
  placeHolder,
  onChangeText,
  inputStyle,
  flag,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHead}>{placeHolder}</Text>
      <View style={styles.inputSection}>
        <View>
          <Text style={{fontSize: 35, marginLeft: 10, flexDirection: 'row'}}>
            {flag}
          </Text>
          <Text style={{fontSize: 25, marginLeft: 10, flexDirection: 'row'}}>
            {flag}
          </Text>
        </View>
      </View>

      <TextInput
        multiline={true}
        value={value}
        keyboardType="phone-pad"
        placeholder="vxxssds"
        placeholderTextColor={MyColor.background}
        style={[styles.textInput, inputStyle]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 10,
    borderColor: MyColor.background,
    flexDirection: 'row',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 2,
    width: '80%',
    paddingRight: 15,
    borderRightColor: MyColor.background,
  },
  textHead: {
    position: 'absolute',
    backgroundColor: MyColor.white,
    paddingHorizontal: 10,
    top: -15,
    left: 20,
    zIndex: 5,
    color: MyColor.black,
    fontSize: 18,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});

export default CustomTextInput;
