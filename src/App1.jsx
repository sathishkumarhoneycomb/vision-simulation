import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Ensure your styles are imported here
import 'bootstrap/dist/css/bootstrap.min.css';
import TorbiLens from "./assets/torbi.png";
import RangeMarker from "./assets/btn_slider_lightblue.png";

const App = () => {
  const [sliderValue, setSliderValue] = useState(1);
  const markerRef = useRef(null); // Ref for the marker image

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  // Calculate the interval to determine which image should be on top
  const interval = Math.floor((sliderValue - 1) / 1000);
  const opacityValue = (sliderValue % 1000) / 1000;
  
  const currentState = interval;
  
  const currentCategory = interval >= 0 && interval <= 2 ? 0 : (interval === 3 ? 1 : 2);
  
  const imageSrc = [
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/normal.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/monofokal.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/edof.jpg",
    "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/trifokal.jpg"
  ];
  const stages = ["Normal", "Presbyopia", "Cataract", "Monofocal IOL", "EDoF IOL", "Trifocul IOL"];

  const calculateLeftPosition = (value) => {
    if (value < 3000) return '-80%'; // Before the range
    if (value > 3500) return '0%'; // After the range

    // Interpolate between -80% and 0%
    const percent = ((value - 3000) / (3500 - 3000)) * 80;
    if(percent < 70) {
      return `calc(-80% + ${percent}%)`;
    } else {
      return "-10%"
    }
  };

  const calculateScale = (value) => {
    if (value < 3000) return 0.7; // Before the range
    if (value > 3500) return 1.2; // After the range

    // Interpolate between 0.7 and 1.2
    const scalePercent = ((value - 3000) / (3500 - 3000)) * (1.2 - 0.7) + 0.7;
    return scalePercent;
  };

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

  return (
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8 px-5 mt-5'>
            <h3>Visual Simulation Tool</h3>
            <p>Cataract + Presbyopia</p>
            <div className="image-stack">
              {
                [...Array(7)].map((_, index) => (
                  <img
                    key={index}
                    src={imageSrc[index]}
                    alt={`Image ${index + 1}`}
                    style={{
                      opacity: index === interval ? 1 : (index === interval + 1 ? opacityValue : 0),
                      transition: 'opacity 0.3s',
                      zIndex: 1,
                    }}
                    className="stack-image"
                  />
                ))
              }
              {
                sliderValue >= 3000 && sliderValue <= 3600 && (
                  <img
                    src={TorbiLens}
                    alt="torbi lens"
                    className='torbi_lens bg-transparent'
                    style={{
                      left: calculateLeftPosition(sliderValue),
                      transform: `scale(${calculateScale(sliderValue)})`,
                    }}
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
              <ul className="list-unstyled d-flex w-100 justify-content-between">
                {
                  [...Array(6)].map((_, index) => (
                    <li
                      key={index}
                      className={`list-unstyled ${currentState === index ? "state_active" : ""} ${index === 5 && currentState === 0 ? "state_active" : ""}`}
                    >
                      {stages[index]}
                    </li>
                  ))
                }
              </ul>
              <input
                type="range"
                min="1"
                max="6000"
                value={sliderValue}
                onChange={handleSliderChange}
                className="range-slider w-100"
              />
              <span className={`me-5 ${currentCategory === 0 ? "state_active" : ""}`}> Prior to surgery </span>
              <span className={`ms-iol ${currentCategory === 1 ? "state_active" : ""}`}> IOL Implantation </span>
              <span className={`ms-as ${currentCategory === 2 ? "state_active" : ""}`}> After Surgery </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
