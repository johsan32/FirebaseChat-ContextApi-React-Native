import React, {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import data from '../constants/Countries';
import {MyColor} from '../theme/colors';
import {MyFonts} from '../theme/MyFonts';

const ModalCityList = ({
  setFlag,
  setModalVisible,
  modalVisible,
  setPhoneCity,
}) => {
  const phoneInputRef = useRef(null);

  const hideModal = () => {
    setModalVisible(false);
    phoneInputRef.current.focus();
  };

  const getCountry = async country => {
    try {
      const countryData = await data;
      const countryCode = countryData.find(
        obj => obj.name === country,
      ).dial_code;
      const countryFlag = countryData.find(obj => obj.name === country).flag;
      setPhoneCity(countryCode);
      setFlag(countryFlag);
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 10,
              paddingTop: 20,
              backgroundColor: MyColor.white,
            }}>
            <Text style={styles.textHead}>Country Phone Codes</Text>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => getCountry(item.name)}>
                  <View
                    style={[
                      styles.countryStyle,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <Text style={styles.textFlag}>{item.flag}</Text>
                    <Text style={styles.textCode}>
                      {item.name} ({item.dial_code})
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.closeButtonStyle}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MyColor.background,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: MyColor.white,
    borderTopColor: MyColor.grey,
    borderTopWidth: 0.5,
    paddingHorizontal: 15,
  },
  textHead: {
    fontFamily: MyFonts.fontPoppinsR,
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 10,
  },
  textFlag: {
    fontSize: 45,
  },
  textCode: {
    color: MyColor.black,
    fontSize: 16,
    fontFamily: MyFonts.regular,
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontFamily: MyFonts.fontPoppinsR,
    fontWeight: '600',
  },

  closeButtonStyle: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: MyColor.primary,
  },
});

export default ModalCityList;
