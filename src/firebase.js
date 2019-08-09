import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDlK7n6fcqpgbssAYtO9OJIpkVi_Dvsw7I",
  authDomain: "car-rental-219000.firebaseapp.com",
  databaseURL: "https://car-rental-219000.firebaseio.com",
  projectId: "car-rental-219000",
  storageBucket: "car-rental-219000.appspot.com",
  messagingSenderId: "937606711574",
  appId: "1:937606711574:web:8b1e297cc68a5249"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineforRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineforFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineforRTDB);
    userDoc.update({
      status: isOnlineforFirestore
    });
  });
}

export { db, firebase };
