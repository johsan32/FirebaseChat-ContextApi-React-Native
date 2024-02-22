import React, {useContext, createContext, useReducer} from 'react';
import {actionType} from './actionTypes';

const MyContext = createContext();

const initialState = {
  myDeviceId: '',
  myPhoneNumber: '',
  myDeviceInfo: {},
  usersList: [],
  myWifiStatus: false,
  myStatus: false,
  myInfo: [],
  myContacts: [],
  myChatsList: [],
  chatMessages: [],
  myCalls: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SAVE_DEVICE_ID:
      return {
        ...state,
        myDeviceId: action.payload,
      };
    case actionType.FETCH_DEVICE_MYPHONE_NUMBER:
      return {
        ...state,
        myPhoneNumber: action.payload,
      };
    case actionType.FETCH_USERLIST_FIREBASE:
      return {
        ...state,
        usersList: action.payload,
      };
    case actionType.FETCH_WIFI_CONNECT:
      return {
        ...state,
        myWifiStatus: action.payload,
      };
    case actionType.FETCH_DEVICE_MYINFO:
      return {
        ...state,
        myDeviceInfo: action.payload,
      };
    case actionType.FETCH_CONTACTS_LIST:
      return {
        ...state,
        myContacts: action.payload,
      };
    case actionType.FETCH_CHATS_LIST:
      return {
        ...state,
        myChatsList: action.payload,
      };
    default:
      return state;
  }
};

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[state, dispatch]}>
      {children}
    </MyContext.Provider>
  );
};

export const appContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useContext must be used with a Context');
  }
  return context;
};

export default ContextProvider;
