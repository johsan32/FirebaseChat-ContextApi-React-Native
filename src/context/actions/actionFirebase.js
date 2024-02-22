import firestore from '@react-native-firebase/firestore';
import {actionType} from '../actionTypes';

export const fetchUserList = dispatch => {
  firestore()
    .collection('Users')
    .get()
    .then(querySnapshot => {
      const users = [];
      querySnapshot.forEach(documentSnapshot => {
        users.push(documentSnapshot.id);
      });
      dispatch({
        type: actionType.FETCH_USERLIST_FIREBASE,
        payload: users,
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchContactList = (dispatch, myPhoneNumber) => {
  firestore()
    .collection(`Users/${myPhoneNumber}/contacts`)
    .orderBy('name', 'asc')
    .onSnapshot(querySnapshot => {
      const contacts = [];
      querySnapshot.forEach(documentSnapshot => {
        contacts.push(documentSnapshot.data());
      });
      dispatch({
        type: actionType.FETCH_CONTACTS_LIST,
        payload: contacts,
      });
    });
};
export const getChatsList = (dispatch, myPhoneNumber) => {
  firestore()
    .collection(`Chats/${myPhoneNumber}/userChats`)
    .orderBy('timeStart', 'desc')
    .onSnapshot(querySnapshot => {
      const chatsList = [];
      querySnapshot.forEach(documentSnapshot => {
        const contactId = documentSnapshot.id;
        chatsList.push(contactId);
      });
      dispatch({
        type: actionType.FETCH_CHATS_LIST,
        payload: chatsList,
      });
    });
};
