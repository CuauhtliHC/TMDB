import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6H4FRJhDpY7eWlZD2QtNdNPZ2GbdXzhI",
  authDomain: "tmdb-b6b20.firebaseapp.com",
  projectId: "tmdb-b6b20",
  storageBucket: "tmdb-b6b20.appspot.com",
  messagingSenderId: "101618108533",
  appId: "1:101618108533:web:5cff0d4453344ce50e503c",
  measurementId: "G-7B9Z7N2SNM",
};

const provider = new GithubAuthProvider();

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const login = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);
export const signup = async (email, password) =>
  await createUserWithEmailAndPassword(auth, email, password);
export const updateUser = async (name) =>
  await updateProfile(auth.currentUser, {
    displayName: name,
  });
export const signOutUser = async () => await signOut(auth);
export const loginGitHub = async () => await signInWithPopup(auth, provider);
