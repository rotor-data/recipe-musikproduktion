import { useLottie, useLottieInteractivity } from "lottie-react";




const LottieScroll = ({boxHeight, animation, mode, frames, visibility, type}) => {

  
  const style = {
    height: boxHeight,
  
  };
  
  const options = {
    animationData: animation,
    loop:true,
    autoplay: true
  };

  const scrollActions = {
    visibility: visibility,
    type: type,
    frames: frames,
  }

  const hoverActions = {
    type: "hover",
    forceFlag: false,
    state: "hover"

}
const toggleActions = {
  tyoe: "play",

 
}

  let activeActions;
  /*if (mode === "scroll") { activeActions = scrollActions }
  if (type === "hover") { activeActions = hoverActions; mode = "cursor" }
  if (type === "play") { activeActions = toggleActions; mode = "cursor" } */
 

  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: mode,
    actions: [ {
      visibility: [0.4, 0.9],
      type: "seek",
      frames: [0, 38],
    },
    ],
  });
  console.log(mode, activeActions)
  return Animation;
};

export default LottieScroll;

/* guide to settings in bottom of page https://lottiefiles.com/interactivity */