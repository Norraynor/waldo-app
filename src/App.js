import React, { useState } from 'react';
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
  const wallyLocation = firestore.collection("location");
  const leaderboards = firestore.collection("leaderboards");
  const leaderboardQuery = leaderboards.orderBy('score').limit(10);
  const [mousePos,setMousePos]= useState(0);
  const [startTime,setStartTime] = useState(0);

  function calculateScore(start,end,clickCount){
    return 61000-(end-start)-(clickCount*1000);
  }
  function calculateTimeInSeconds(start,end){
    return (end-start)/1000;
  }
  function handleLoad(event){
    console.log("page fully loaded -time started");
    setStartTime(new Date());
    changePara("ready");
    document.querySelector(".Photo").style.setProperty('--visibility',"visible");
  }
  function changePara(text){
    const paraSelect = document.querySelector(".ready-indicator");
    paraSelect.textContent = text;
  }
  async function handleFinish(event){
    let score = 0;
    //---need to fix data send to firestore ---
    const sendData = async(e)=>{
      await leaderboards.add({
        name: prompt("Enter your name for leaderboard"),
        score: score,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    if(startTime !== 0 && event.detail.endTime !== 0){
      score = calculateScore(startTime,event.detail.endTime,event.detail.clickCount)
      console.log(score)
      changePara("FOUND! Your score: "+score.toString()+" Miss clicked: "+event.detail.clickCount.toString() + "times");
      const docRef = await sendData(event);
      console.log(docRef);
    }
  }
  function handleReload(event){
    window.location.reload();
  }
  console.log("how many")
  //window.addEventListener('load',handleLoad,{once:true})
  window.addEventListener('finish',handleFinish,{once:true})
  return (
    <div className="App">
      <div id="mouse-circle"></div>

      {
        //for testing mouse radius
        window.addEventListener('load', (e) => {
          handleLoad(e);
          let mousePosX = 0, mousePosY = 0;
          //mouseCircle = document.getElementById('mouse-circle');

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
            /*
            if(mouseCircle){
              mouseCircle.style.top = revisedMousePosY + 'px';
              mouseCircle.style.left = revisedMousePosX + 'px';            
            }
            */
          }
          delayMouseFollow();
          setMousePos([revisedMousePosX,revisedMousePosY]);
          console.log("fired again?")
        })
      }
      

      <header className="App-header">
        <button onClick={handleReload}>Reset</button>
        <p className='ready-indicator' >wait</p>
        <div className='img-container'>
          <Photo mousePosX={mousePos[0]} mousePosY={mousePos[1]} wallyLocation={wallyLocation}/>
        </div>
      </header>
    </div>
  );
}

export default App;
