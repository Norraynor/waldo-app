import './Photo.css';

const wally = {
  x:820,
  y:290,
  width:20,
  height:40
}
function Photo(props) { 
    function handleMouseClick(event){
      let rect = event.target.getBoundingClientRect();
      //console.log(event.clientX,event.clientY,event.pageX,event.pageY,event.screenX,event.screenY,rect)
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      let currentPosition = [x,y];
      console.log(currentPosition);


      //collision detection could be viable here https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
      collisionDetection(currentPosition);
    }
    function collisionDetection(mousePos){
      let offset = parseInt(window.getComputedStyle(document.querySelector(".App").parentElement).getPropertyValue('--offset').match(/\d/g).join(""));
      if(mousePos[0]+offset>wally.x && mousePos[0]-offset<wally.x+wally.width && mousePos[1]+offset>wally.y && mousePos[1]-offset<wally.y+wally.height){
        //hit wally
        console.log("wally hit");
      }else{
        console.log("missed");
      }
    }
  return (
    <div className="Photo" onClick={handleMouseClick} >
      <div className='wally'></div>
        Photo goes here!
    </div>
  );
}

export default Photo;
