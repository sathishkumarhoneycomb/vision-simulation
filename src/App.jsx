import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Ensure your styles are imported here
import 'bootstrap/dist/css/bootstrap.min.css';
import TorbiLens from "./assets/torbi.png";
import RangeMarker from "./assets/btn_slider_lightblue.png";
import EdofLens from "./assets/lisa_tri_lens.png";
import TriFoculLens from "./assets/lisa_tri_lens.png";
import BtnAutoPlay from "./assets/btn_autoplay_lightblue.png";


const states = [
  {
    stateId : 0,
    title: "Normal",
    description: "At the normal generally people will be able to see clearly"
  },
  {
    stateId : 1,
    title: "Presbyopia",
    description: "At this state, You can see far objects but near objects will be blurry"
  },
  {
    stateId : 2,
    title: "Cataract",
    description: "When the person has cataract, both far and near objects will look blurry"
  },
  {
    stateId : 3,
    title: "Monofocal IOL",
    description: "It is a one way correction, where any of the sightedness is corrected"
  },
  {
    stateId : 4,
    title: "EDoF IOL",
    description: "It is an advanced version of the monofocul lens. you can see things clearly but still some objects will look blurry"
  },
  {
    stateId : 5,
    title: "Trifocul IOL",
    description: "You will be able to the world clearly withoug glasses"
  },

]



const App = () => {

  const [sliderValue, setSliderValue] = useState(1);
  const [ autoPlay, setautoPlay ]  = useState({
    intervalId : 0,
    intervalStatus: false // false => not running .. True =>  runnig
  });

  const markerRef = useRef(null); // Ref for the marker image
  const autoPlayBtnRef = useRef(null);
  const inputRangeRef = useRef(null);



  // derived states 
  let currentState = 0;
  let minRange = 0;
  let maxRange = 0;
  let currentCategory = 0;
  let currentStateDescription ;


  const computeOpacity = (value) => {
    const minOpacity = 0.1;
    const maxOpacity = 0.9;
    
    let opacityValue1 = minOpacity + ((value - minRange) / (maxRange - minRange)) * (maxOpacity - minOpacity);
    opacityValue1 = Number(opacityValue1.toFixed(3));
    return opacityValue1
  }

  function  handleSliderChange (e) {
    setSliderValue(parseInt(e.target.value, 10)); 
  };


  function computeLensStyle() {
    let minLeft = -50;
    let maxLeft = 50;

    let minLeftRange = 2900;
    let maxLeftRange = 3300;

    let minScale = 0.7;
    let maxScale = 2.0;

    let minScaleRange = 3301;
    let maxScaleRange = 3500;

    const style = {
      left : "-50%",
      transform: "translate(-50%, -50%) scale(0.7)"
    }

    if(sliderValue >= 2900 && sliderValue <= 3300) {
        let leftValue = minLeft + ((sliderValue - minLeftRange) / (maxLeftRange - minLeftRange)) * (maxLeft - minLeft); 
        return { ...style , left: `${leftValue}%`}
    } else {
      let scaleValue = minScale + ((sliderValue - minScaleRange) / (maxScaleRange - minScaleRange)) * (maxScale - minScale); 
      return {left : "50%", transform: `translate(-50%, -50%) scale(${scaleValue})`}
    }
  }


  function EdofLensStyle() {
    let minLeft = -50;
    let maxLeft = 50;

    let minLeftRange = 3900;
    let maxLeftRange = 4200;

    let minScale = 0.7;
    let maxScale = 4.0;

    let minScaleRange = 4201;
    let maxScaleRange = 4500;

    const style = {
      left : "-50%",
      transform: "translate(-50%, -50%) scale(0.7)"
    }

    
    if(sliderValue >= 3900 && sliderValue <= 4200) {
      let leftValue = minLeft + ((sliderValue - minLeftRange) / (maxLeftRange - minLeftRange)) * (maxLeft - minLeft); 
      return { ...style , left: `${leftValue}%`}
  } else {
    let scaleValue = minScale + ((sliderValue - minScaleRange) / (maxScaleRange - minScaleRange)) * (maxScale - minScale); 
    return {left : "50%", transform: `translate(-50%, -50%) scale(${scaleValue})`}
  }

  }

  function TriFoculLensStyle() {
    let minLeft = -50;
    let maxLeft = 50;

    let minLeftRange = 4900;
    let maxLeftRange = 5200;

    let minScale = 0.7;
    let maxScale = 4.0;

    let minScaleRange = 5201;
    let maxScaleRange = 5500;

    const style = {
      left : "-50%",
      transform: "translate(-50%, -50%) scale(0.7)"
    }

    
    if(sliderValue >= 4900 && sliderValue <= 5200) {
      let leftValue = minLeft + ((sliderValue - minLeftRange) / (maxLeftRange - minLeftRange)) * (maxLeft - minLeft); 
      return { ...style , left: `${leftValue}%`}
  } else {
    let scaleValue = minScale + ((sliderValue - minScaleRange) / (maxScaleRange - minScaleRange)) * (maxScale - minScale); 
    return {left : "50%", transform: `translate(-50%, -50%) scale(${scaleValue})`}
  }

  }







  if(sliderValue>= 1 && sliderValue <= 1000) {
    // normal state
    currentState = 0
    currentCategory = 0
    minRange = 1
    maxRange = 1000 
    currentStateDescription = states[currentState].description;
  } else if(sliderValue >= 1001 && sliderValue <= 2000) {
    // presbyopia  state
    currentState = 1
    currentCategory = 0
    minRange = 1001
    maxRange = 2000 
    currentStateDescription = states[currentState].description;
   
  } else if (sliderValue >= 2001 && sliderValue <= 3500) {
    // cataract state
    currentState = 2
    currentCategory = 0
    minRange = 2001
    maxRange = 4000
    currentStateDescription = states[currentState].description;
  } else if (sliderValue >= 3501 && sliderValue <= 4500) {
    // monofocul state
    currentState = 3
    currentCategory = 1
    minRange = 3501
    maxRange = 4500
    currentStateDescription = states[currentState].description;
  } else if (sliderValue >= 4501 && sliderValue <= 5500) { 
    // edof state when the slider value hits 4501 .my edof opacity becomes 1 
    currentState = 4 
    currentCategory = 2
    minRange = 4501 
    maxRange = 5500
    currentStateDescription = states[currentState].description;
  } else {
    // trifocul state 
    currentState = 5 
    currentCategory =2
    minRange = 5501
    maxRange = 6500
    currentStateDescription = states[currentState].description;
  }



      
  const imageSrc = [
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/normal.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/monofokal.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/edof.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/trifokal.jpg"
  ];


  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      const slider = document.querySelector('.range-slider');
      const sliderWidth = slider.offsetWidth;
      const sliderMin = parseInt(slider.min, 10);
      const sliderMax = parseInt(slider.max, 10);
      const sliderValue = parseInt(slider.value, 10);
      
      const percent = (sliderValue - sliderMin) / (sliderMax - sliderMin);
      const markerPosition = percent * sliderWidth;

      marker.style.left = `${markerPosition}px`;
    }
  }, [sliderValue]);

  // AUTO PLAY FEATURE 

  function  handleAutoPlay() {

        setSliderValue(0);
        const changeInputValue = () =>  {
          inputRangeRef.current.stepUp(5);
          setSliderValue(inputRangeRef.current.value);
        }

        if(autoPlay.intervalStatus == false) {
          const myInterval = setInterval(changeInputValue,30);

          setautoPlay(() => {
            return { intervalId : myInterval, intervalStatus : true }
          }); 
        }
  }

  console.log(sliderValue);

  if(sliderValue > 6500) {
    setautoPlay((prev) => {
      clearInterval(prev.intervalId)
      return {intervalId : 0, intervalStatus : false};
    })
    setSliderValue(0);
  }

  function removeAutoPlay() {
    setautoPlay((prev) => {
      clearInterval(prev.intervalId)
      return {intervalId : 0, intervalStatus : false};
    })
  }





  
  



  return (
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 px-5 mt-5'>
            <h3>Visual Simulation Tool</h3>
            <p>Cataract + Presbyopia</p>
            <div className="image-stack">
              {
                [...Array(6)].map((_, index) => (
                  <img
                    key={index}
                    src={imageSrc[index]}
                    alt={`Image ${index + 1}`}
                    style={{
                      opacity: index == currentState ? 1 : (index == currentState + 1 ? computeOpacity(sliderValue) : 0),
                      transition: 'opacity 0.3s'
                    }}
                    className="stack-image"
                  />
                ))
              }
              {
                sliderValue >= 2900 && sliderValue <= 3500 && (
                  <img
                    src={TorbiLens}
                    alt="torbi lens"
                    className='torbi_lens bg-transparent'
                    style={
                      computeLensStyle()
                    }
                  />
                )
              }

              {
                sliderValue >= 3900 && sliderValue <= 4500 && (
                    <img 
                    src={EdofLens}
                    alt="trifocul lens"
                    className='torbi_lens bg-transparent'
                    style = {
                      EdofLensStyle()
                    }
                    />  
                )
              }

{
                sliderValue >= 4900 && sliderValue <= 5500 && (
                    <img 
                    src={TriFoculLens}
                    alt="trifocul lens"
                    className='torbi_lens bg-transparent'
                    style = {
                      TriFoculLensStyle()
                    }
                    />  
                )
              }

              <img
                src={RangeMarker}
                alt="marker"
                className="marker"
                ref={markerRef}
              />
            </div>
            <div className="mt-5">
            
            <div className='d-flex'>
            <p
  key={0}
  className={`normal_text ${
    currentState === 0 ? "state_active" : ""
  } ${
    0 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[0].title}
</p>



<p
  key={1}
  className={`pres_text ${
    currentState === 1 ? "state_active" : ""
  } ${
    1 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[1].title}
</p>

<p
  key={2}
  className={`cataract_text ${
    currentState === 2 ? "state_active" : ""
  } ${
    2 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[2].title}
</p>

<p
  key={3}
  className={`monofocul_text ${
    currentState === 3 ? "state_active" : ""
  } ${
    3 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[3].title}
</p>

<p
  key={4}
  className={`edof_text ${
    currentState === 4 ? "state_active" : ""
  } ${
    4 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[4].title}
</p>

<p
  key={5}
  className={`trifocul_text ${
    currentState === 5 ? "state_active" : ""
  } ${
    5 === 5 && currentState === 0 ? "state_active" : ""
  }`}
>
  {states[5].title}
</p>
</div>

              <input
                type="range"
                min="1"
                max="6500"
                value={sliderValue}
                onChange={handleSliderChange}
                className="range-slider w-100"
                ref={inputRangeRef}
              />
             <div className="d-flex justify-content-center">
  <p
    className={`prior_text ${
      currentCategory === 0 ? "state_active" : ""
    }`}
  >
    Prior to surgery
  </p>

  <p
    className={`iol_text ${
      currentCategory === 1 ? "state_active" : ""
    }`}
  >
    IOL Implantation
  </p>

  <p
    className={`after_surgery_text ${
      currentCategory === 2 ? "state_active" : ""
    }`}
  >
    After Surgery
  </p>
</div>
            </div>

            <div className='mt-3 row align-items-center' >
              <div className='col-md-4'>
              <img src={BtnAutoPlay} alt="auto play button" ref={autoPlayBtnRef} onClick={handleAutoPlay} className=''/> 
              <span className='ms-2'> Auto Play  </span>
              </div>
              <div className='col-md-8'>
              <div className="d-flex">
                {
                  currentState == 0 &&   <p className="state_description text-dark fade-in visible">
                  At the normal generally people will be able to see clearly.
                </p>
                }

                {
                  currentState == 1 &&   <p className="state_description text-dark fade-in visible">
                  At this state, you can see far objects but near objects will be blurry.
                </p>
                }


                {
                  currentState == 2 &&   <p className="state_description text-dark fade-in visible">
                  When the person has cataract, both far and near objects will look blurry.
                </p>
                }


                {
                  currentState == 3 &&   <p className="state_description text-dark fade-in visible">
                  It is a one-way correction, where any of the sightedness is corrected.
                </p>
                }

                  {
                    currentState == 4 &&   <p className="state_description text-dark fade-in visible">
                    It is an advanced version of the monofocal lens. You can see things clearly but still some objects will look blurry.
                  </p>
                  }


                  {
                    currentState == 5 &&   <p className="state_description text-dark fade-in visible">
                    You will be able to see the world clearly without glasses.
                  </p>
                  }

</div>


</div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
