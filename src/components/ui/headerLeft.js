import {StyleSheet, View} from 'react-native';
import React from 'react';

const HeaderLeft = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../assets/icons/close.png')}
      />
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({});
