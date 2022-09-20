import { firebase } from '@firebase/app';
import 'firebase/firestore';
import "firebase/auth"
import "firebase/database"
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBz2iXvgbxeN85J880DAviDpYMSAkXZCCs",
  authDomain: "adventure-logx.firebaseapp.com",
  projectId: "adventure-logx",
  storageBucket: "adventure-logx.appspot.com",
  messagingSenderId: "268709872474",
  appId: "1:268709872474:web:571c34d445d9a2f88b2963",
  measurementId: "G-B9ZNTNPGFV"
};

const app = firebase.initializeApp(firebaseConfig);


if (window.location.hostname === "localhost") {
  app.auth().useEmulator("http://localhost:9099");
  app.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
  app.database().useEmulator('localhost', 9000);
  app.functions().useEmulator("localhost", 5001);
}

export { app };