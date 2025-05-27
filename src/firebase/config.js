import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAFrcZKDE-jWy5wFhGJglWTcTq9rm4xtc4",
  authDomain: "iot-project-92387.firebaseapp.com",
  databaseURL:
    "https://iot-project-92387-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-project-92387",
  storageBucket: "iot-project-92387.firebasestorage.app",
  messagingSenderId: "55574699815",
  appId: "1:55574699815:web:680063215c0b46e5c09302",
  measurementId: "G-7376HMCSF7",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);