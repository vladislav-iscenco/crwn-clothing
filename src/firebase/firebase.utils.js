import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCyDtpyLpFqDu8bSq3uT0wHRVlUrDhvsKE",
    authDomain: "crwn-db-f89e2.firebaseapp.com",
    projectId: "crwn-db-f89e2",
    storageBucket: "crwn-db-f89e2.appspot.com",
    messagingSenderId: "1011159242667",
    appId: "1:1011159242667:web:76a22166ab138e78cae4ee",
    measurementId: "G-8XSW6ZD1GG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;