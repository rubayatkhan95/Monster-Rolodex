import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import {getFirestore} from 'firebase/firestore'
 import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyBLRiQT7ReCt_ozCDbCPHoxfJ9kaSHVdKE",
  authDomain: "monster-rolodex-6095c.firebaseapp.com",
  projectId: "monster-rolodex-6095c",
  storageBucket: "monster-rolodex-6095c.appspot.com",
  messagingSenderId: "24784062182",
  appId: "1:24784062182:web:c8754d5089ee830eaa5d27",
  measurementId: "G-XV4P94QB8P"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {

    onMessage(messaging, (payload) => {
      console.log("Message received. ", JSON.stringify(payload));
      resolve(payload);
    });

  });

export const getFirebaseToken = async (setTokenFound) => {
    let currentToken = "";
    try {

      currentToken = await getToken(messaging,{ vapidKey: publicKey });
      if (currentToken) {
        setTokenFound(true);
      } else {
        setTokenFound(false);
      }
    } catch (error) {
      console.log("An error occurred while retrieving token. ", error);
    }

    return currentToken;
  };
