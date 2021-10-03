import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDSBZLWTaIqFDh4PITP7IcTQCvA21kGYHY",
    authDomain: "birthday-calendar-16192.firebaseapp.com",
    projectId: "birthday-calendar-16192",
    storageBucket: "birthday-calendar-16192.appspot.com",
    messagingSenderId: "1098414201517",
    appId: "1:1098414201517:web:68b17d5132550c60188424"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth()
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp)

export {
    firebaseApp,
    auth,
    provider,
    db,
};
