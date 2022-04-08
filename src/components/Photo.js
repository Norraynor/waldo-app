import { useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './Photo.css';

/*const wally = {
  x:820,
  y:290,
  width:20,
  height:40
}*/
function Photo(props) { 
  let wally;
  const wallyLocation = props.wallyLocation;
  const [location] = useCollectionData(wallyLocation);
  const photo = useRef(null)

  /*
  function photoVarsGet(){
    let photoStyles = getComputedStyle(photo.current.querySelector(".wally"));
  }
  */
  function photoVarsSet(bool){
    const wallySelector =  photo.current.querySelector(".wally");
    if(bool){
      wallySelector.style.setProperty('--top',`${wally.y}px`);
      wallySelector.style.setProperty('--left',`${wally.x}px`);
      wallySelector.style.setProperty('--width',`${wally.width}px`);
      wallySelector.style.setProperty('--height',`${wally.height}px`);
      wallySelector.style.setProperty('--border',`2px`);

    }else{
      wallySelector.style.setProperty('--top',`0px`);
      wallySelector.style.setProperty('--left',`0px`);
      wallySelector.style.setProperty('--width',`0px`);
      wallySelector.style.setProperty('--height',`0px`);}
      wallySelector.style.setProperty('--border',`0px`);
  }

  function handleMouseClick(event){
    let rect = event.target.getBoundingClientRect();
    //console.log(wallyLocation);
    //console.log(location);
    wally = location[0];
    //console.log(event.clientX,event.clientY,event.pageX,event.pageY,event.screenX,event.screenY,rect)
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let currentPosition = [x,y];

    //collision detection could be viable here https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
    
    if(collisionDetection(currentPosition)){
      console.log("event goes")
      event.target.dispatchEvent(new CustomEvent('finish',{
        bubbles:true,
        cancelable:true,
        detail:{
          endTime: new Date()
        }
      }));      
    }
  }
  function collisionDetection(mousePos){
    let offset = parseInt(window.getComputedStyle(document.querySelector(".App").parentElement).getPropertyValue('--offset').match(/\d/g).join(""));
    //photoVarsGet();
    if(mousePos[0]+offset>wally.x && mousePos[0]-offset<wally.x+wally.width && mousePos[1]+offset>wally.y && mousePos[1]-offset<wally.y+wally.height){
      //hit wally
      console.log("wally hit");
      photoVarsSet(1);
      return true;
    }else{
      console.log("missed");
      photoVarsSet(0);
      return false;
    }
  }
  return (
    <div className="Photo" onClick={handleMouseClick} ref={photo} >
      <div className='wally'></div>
    </div>
  );
}

export default Photo;
