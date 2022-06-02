import 'react-native-gesture-handler';
import React from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/navigation';
import CommentSection from './src/components/CommentSection';
//const firebase = require('firebase/app');

// require("firebase/firestore");
// require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhfgndWdlbH-uWFplfqeuH2PekoZUZGe0",
  authDomain: "mine-detector-a7f29.firebaseapp.com",
  projectId: "mine-detector-a7f29",
  storageBucket: "mine-detector-a7f29.appspot.com",
  messagingSenderId: "291670315915",
  appId: "1:291670315915:web:7b1aaf61cd1b0c248a558e",
  measurementId: "G-75TEXWR8PH"
};

const app = initializeApp(firebaseConfig);

// if (!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig);
// }

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark"
}
const customTheme = extendTheme({config});

export const db = getFirestore(app);
export const auth = getAuth();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <Navigation />
        </NativeBaseProvider>
      </Provider>
      
    </SafeAreaProvider>
  );
}
