import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowWidth} from '../../utils/Dimensions';
import {MyColor} from '../../theme/colors';
import {MyFonts} from '../../theme/MyFonts';

const Button = props => {
  const {text, size, color, textColor, disabled = false} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      style={[styles.container, {width: size, backgroundColor: color}]}>
      <Text style={[styles.btnText, {color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: windowWidth * 0.05,
    backgroundColor: MyColor.lightGrey,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: MyFonts.regular,
    fontWeight: '700',
    fontSize: 18,
    fontWeight: 600,
  },
});
