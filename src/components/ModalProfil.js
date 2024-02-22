import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {MyColor} from '../theme/colors';
import {MyFonts} from '../theme/MyFonts';


const ModalProfil = ({
  setModalVisible,
  modalVisible,
  imageCamera,
  imageGallery,
  setPhoto,
  userPhotoDelete,
}) => {

  const handleDeletePress = () => {
    setPhoto(null);
    userPhotoDelete();
    setModalVisible(false);
  };

  const handleCameraPress = () => {
    imageCamera();
    setModalVisible(false);
  };

  const handleGalleryPress = () => {
    imageGallery();
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSection}>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={handleCameraPress}>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.image}
                    source={require('../assets/images/camera.png')}
                  />
                  <Text style={styles.textImg}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGalleryPress}>
                <View style={styles.inputContainer}>
                  <Image
                    style={styles.image}
                    source={require('../assets/images/gallery.png')}
                  />
                  <Text style={styles.textImg}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: MyColor.red}]}
              onPress={handleDeletePress}>
              <Text style={styles.textBtn}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}>
              <Text style={styles.textBtn}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalSection: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '80%',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: MyColor.primary,
    borderRadius: 10,
    backgroundColor: MyColor.primary,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
    gap: 40,
    marginBottom: 50,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  textImg: {
    fontFamily: MyFonts.fontPoppinsR,
    fontSize: 15,
    paddingTop: 8,
    color: MyColor.white,
  },
  button: {
    backgroundColor: MyColor.primary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  textBtn: {
    textAlign: 'center',
    fontFamily: MyFonts.fontPoppinsR,
    fontSize: 16,
    color: MyColor.white,
    fontWeight: '600',
  },
});
export default ModalProfil;
