import './Photo.css';

function Photo(props) { 
    function handleMouseClick(event){
        let rect = event.target.getBoundingClientRect();
        //console.log(event.clientX,event.clientY,event.pageX,event.pageY,event.screenX,event.screenY,rect)
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let currentPosition = [x,y];
        console.log(currentPosition);
    }
  return (
    <div className="Photo" onClick={handleMouseClick} >
        Photo goes here!
    </div>
  );
}

export default Photo;
