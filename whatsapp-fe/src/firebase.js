// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
// require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAlP4NvHqFoTLRxFYMq-bI0wTWZUIGRMcU",
  authDomain: "whatsapp-messaging-mern.firebaseapp.com",
  databaseURL: "https://whatsapp-messaging-mern.firebaseio.com",
  projectId: "whatsapp-messaging-mern",
  storageBucket: "whatsapp-messaging-mern.appspot.com",
  messagingSenderId: "459628542064",
  appId: "1:459628542064:web:ada96aa7f412aa36589cb5",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
// export default db;
