import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6H4FRJhDpY7eWlZD2QtNdNPZ2GbdXzhI",
    authDomain: "tmdb-b6b20.firebaseapp.com",
    projectId: "tmdb-b6b20",
    storageBucket: "tmdb-b6b20.appspot.com",
    messagingSenderId: "101618108533",
    appId: "1:101618108533:web:5cff0d4453344ce50e503c",
    measurementId: "G-7B9Z7N2SNM"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)