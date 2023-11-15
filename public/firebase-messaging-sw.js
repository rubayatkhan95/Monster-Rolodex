importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyBLRiQT7ReCt_ozCDbCPHoxfJ9kaSHVdKE",
    authDomain: "monster-rolodex-6095c.firebaseapp.com",
    projectId: "monster-rolodex-6095c",
    storageBucket: "monster-rolodex-6095c.appspot.com",
    messagingSenderId: "24784062182",
    appId: "1:24784062182:web:c8754d5089ee830eaa5d27",
    measurementId: "G-XV4P94QB8P"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});