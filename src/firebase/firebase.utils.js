import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCBF4CSLKRalXAnFEB3g6xi3c8kA8moN0c",
  authDomain: "crwn-clth-dev.firebaseapp.com",
  databaseURL: "https://crwn-clth-dev.firebaseio.com",
  projectId: "crwn-clth-dev",
  storageBucket: "crwn-clth-dev.appspot.com",
  messagingSenderId: "1040359009136",
  appId: "1:1040359009136:web:2bf8894714a96bcae97db5",
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const SignInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
