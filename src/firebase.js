import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAKbup7RIqOswEZnoi9tgp4469BJdpllKY',
  authDomain: 'chat-app-b5b74.firebaseapp.com',
  databaseURL: 'https://chat-app-b5b74.firebaseio.com',
  projectId: 'chat-app-b5b74',
  storageBucket: 'chat-app-b5b74.appspot.com',
  messagingSenderId: '135405182654',
};
firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  rtdb.ref('.info/connected').on('value', snapshot => {
    console.log(snapshot.val());
  });
}

export { db, firebase };
