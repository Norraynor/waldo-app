import React, { useEffect, useState } from 'react';
import './App.css';
import Photo from "./components/Photo.js";

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

//import {useCollectionData} from 'react-firebase-hooks/firestore';

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
  const [mousePos,setMousePos]= useState(0);
  const [startTime,setStartTime] = useState(0);

  function calculateScore(start,end){
    return 60000-(end-start);
  }
  function handleLoad(event){
    console.log("page fully loaded -time started");
    setStartTime(new Date());
  }
  function handleFinish(event){
    if(startTime !== 0 && event.detail.endTime !== 0){
      console.log(calculateScore(startTime,event.detail.endTime))
    }
  }
  console.log("how many")
  window.addEventListener('load',handleLoad,{once:true})
  window.addEventListener('finish',handleFinish,{once:true})
  return (
    <div className="App">
      <div id="mouse-circle"></div>

      {
        //for testing mouse radius
        document.addEventListener('DOMContentLoaded', (e) => {
          let mousePosX = 0, mousePosY = 0,
          mouseCircle = document.getElementById('mouse-circle');

          document.onmousemove = (e) => {
            mousePosX = e.pageX;
            mousePosY = e.pageY;
          }

          let delay = 6,
          revisedMousePosX = 0,
          revisedMousePosY = 0;
          function delayMouseFollow() {
            requestAnimationFrame(delayMouseFollow);

            revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
            revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

            if(mouseCircle){
              mouseCircle.style.top = revisedMousePosY + 'px';
              mouseCircle.style.left = revisedMousePosX + 'px';            
            }
          }
          delayMouseFollow();
          setMousePos([revisedMousePosX,revisedMousePosY]);
          console.log("fired again?")
        })
      }
      

      <header className="App-header">
        LMAO
        <div className='img-container'>
          image goes here - with logic and stuff
          <Photo mousePosX={mousePos[0]} mousePosY={mousePos[1]} firestore={firestore} setStartTime={setStartTime}/>
        </div>
      </header>
    </div>
  );
}

export default App;
