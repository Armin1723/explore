// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyDzkrE_uEqtKSoTkqNUu8xj3Qo6IUF33T4",
    authDomain: "explore-39697.firebaseapp.com",
    projectId: "explore-39697",
    storageBucket: "explore-39697.firebasestorage.app",
    messagingSenderId: "409032430983",
    appId: "1:409032430983:web:4cb7d0f612c1d8adfb2f22",
    measurementId: "G-17KMRKL1RZ"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || '/favicon/android-chrome-192x192.png',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });