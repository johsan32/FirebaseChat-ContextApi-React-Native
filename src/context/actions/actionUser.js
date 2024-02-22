import DeviceInfo from 'react-native-device-info';
import {actionType} from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const saveDeviceId = async dispatch => {
  try {
    const id = await DeviceInfo.getAndroidId();
    dispatch({
      type: actionType.SAVE_DEVICE_ID,
      payload: id,
    });
  } catch (error) {
    console.error('Error saving device ID:', error);
  }
};
export const fetchWifiStatus = async dispatch => {
  try {
    const state = await NetInfo.fetch();
    const wifi = state.isConnected;
    dispatch({
      type: actionType.FETCH_WIFI_CONNECT,
      payload: wifi,
    });
  } catch (error) {
    console.error('Error while fetching net info:', error);
  }
};

export const getStorageMyNumber = async dispatch => {
  try {
    const value = await AsyncStorage.getItem('@myNumber');
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      dispatch({
        type: actionType.FETCH_DEVICE_MYPHONE_NUMBER,
        payload: parsedValue,
      });
    }
  } catch (error) {
    console.log('myPhoneNumber', error);
  }
};

export const storageDeviceMyNumber = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@myNumber', jsonValue);
  } catch (e) {}
};
export const fetchStorageMyInfo = async dispatch => {
  try {
    const value = await AsyncStorage.getItem('@myUserInfo');
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      dispatch({
        type: actionType.FETCH_DEVICE_MYINFO,
        payload: parsedValue,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
