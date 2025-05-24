import { initializeApp, FirebaseApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Mixpanel } from "mixpanel-react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyCvEjT5ml4o5TGIcuyj8xYnoMf9EgvLTMY",
    authDomain: "ask-max-development.firebaseapp.com",
    projectId: "ask-max-development",
    storageBucket: "ask-max-development.firebasestorage.app",
    messagingSenderId: "924149034203",
    appId: "1:924149034203:web:cd91114986554fa29ff0fe",
    measurementId: "G-VJBX13FY5H"
};

let app: FirebaseApp;

// INITIALIZE FIREBASE ONLY ONCE
if (!getApps().length) {
    app = initializeApp(firebaseConfig);

} else {
    app = getApp();
}

// const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

const appInfo = { version: "1.0.0", build: 1 };

const auth = ""

const BASE_URL = "http://10.101.196.8:3333/api";
const SUPERWALL_API_KEY = "";

const trackAutomaticEvents = true;

// PRODUCTION
// const mixpanel = new Mixpanel("aa", trackAutomaticEvents);
// const mixpanel = new Mixpanel("ce24c71b386d53c90c0b66a994520a15", trackAutomaticEvents);
// mixpanel.init();
// const mixpanel = new Mixpanel("ce24c71b386d53c90c0b66a994520a15", trackAutomaticEvents);
let mixpanel = null;
const db = getFirestore(app);

const isTestFlightBuild = false;

export { appInfo, BASE_URL, auth, isTestFlightBuild, mixpanel, db, SUPERWALL_API_KEY };