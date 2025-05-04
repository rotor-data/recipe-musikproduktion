import React, { createRef, useEffect } from "react";
import lottie from 'lottie-web';
import animationData from '../animations/rotor_anim_logo.json';
const Lottie = (props) => {
  
  let animationContainer = createRef();
  let anim = null;
  useEffect(() => {
    anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: props.autoPlay,
      animationData: animationData
    });
    return () => anim.destroy(); // optional clean up for unmounting
  }, []);
  function handleStop() {
    anim.pause();
  }
  function handleStart() {
    anim.play();
  }
  return (
         <div>
         {props.hover ==="true" ? <div onMouseEnter={handleStart} onMouseLeave={handleStop}>
            Hover me
            <div ref={animationContainer}></div>
          </div> :
          <div ref={animationContainer}></div> 
          }
          
     </div>

  );
};
export default Lottie;