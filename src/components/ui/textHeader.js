import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyFonts} from '../../theme/MyFonts';
import {MyColor} from '../../theme/colors';

const TextHeader = ({title}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default TextHeader;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: MyFonts.black,
    color: MyColor.black,
    marginBottom: 15,
  },
});
