import firebase from 'firebase';
import 'firebase/firestore';

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

export { db };
