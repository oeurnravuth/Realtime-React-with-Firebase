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
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineforRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineforFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineforRTDB);
    userDoc.update({
      status: isOnlineforFirestore,
    });
  });
}

export { db, firebase };
