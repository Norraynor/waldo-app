import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyC1TvsWFWP8R4zU5aT8KYG0gJxXlD5H6Ow",
  authDomain: "waldo-app-20884.firebaseapp.com",
  projectId: "waldo-app-20884",
  storageBucket: "waldo-app-20884.appspot.com",
  messagingSenderId: "773298284070",
  appId: "1:773298284070:web:25eb23b3c973e46f81e8e7"
})

const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        LMAO
        <div className='img-container'>image goes here - with logic and stuff</div>
      </header>
    </div>
  );
}

export default App;
