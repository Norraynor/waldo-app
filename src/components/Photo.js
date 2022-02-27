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
      collisionDetection();
    }
    function collisionDetection(){
      console.log(Math.round(props.mousePosX),Math.round(props.mousePosY));
      if(props.mousePosX>wally.x && props.mousePosX<wally.x+wally.width && props.mousePosY>wally.y && props.mousePosY<wally.y+wally.height){
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
