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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments =
    async (colletionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(colletionKey);
        console.log(collectionRef);

        const batch = firestore.batch();
        objectsToAdd.forEach(obj => {
            const newDocRef = collectionRef.doc();
            console.log(newDocRef);
            batch.set(newDocRef, obj);
        });

        return await batch.commit();
    }

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(
        doc => {
            const { title, items } = doc.data();
            return {
                routerName: encodeURI(title.toLowerCase()),
                id: doc.id,
                title,
                items
            }
        });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;