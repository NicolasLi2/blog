// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'blog-989c3.firebaseapp.com',
  projectId: 'blog-989c3',
  storageBucket: 'blog-989c3.appspot.com',
  messagingSenderId: '275644247772',
  appId: '1:275644247772:web:3bf97485d6189f99cf8e19',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
