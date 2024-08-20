import React, { useState } from 'react';
import './App.css'; // Assuming you have your styles here
import 'bootstrap/dist/css/bootstrap.min.css';
import TorbiLens from "./assets/torbi.png";

const App = () => {
  const [sliderValue, setSliderValue] = useState(1);
  
  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  // Calculate the interval to determine which image should be on top
  const interval = Math.floor((sliderValue - 1) / 1000);
  const opacityValue = (sliderValue % 1000) / 1000;

  const imageSrc = ["https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/normal.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/monofokal.jpg","https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/edof.jpg","https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/trifokal.jpg"]
  const stages = ["normal", "presbyopia", "cataract", "monofocal", "multi focul", "trifocul"];
  const categories = ["Prior to surgery", "IOL Implantation", "After surgery"];
  const calculateLeftPosition = (value) => {
    if (value < 3000) return '-80%'; // Before the range
    if (value > 3500) return '0%'; // After the range

    // Interpolate between -80% and 0%
    const percent = ((value - 3000) / (3500 - 3000)) * 80;
    console.log(percent)
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
    const scalePercent = ((value - 3000) / (3500 - 3000)) * (1 - 1) + 0.7;
    return scalePercent;
  };

  
  return (
    <div>



      <div className="image-stack ">
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
          sliderValue >= 3000  && sliderValue <= 3600 &&  (
            <img src={TorbiLens} alt="torbi lens"  className='torbi_lens bg-transparent'
            style={{
              left: calculateLeftPosition(sliderValue),
              transform: `scale(${calculateScale(sliderValue)})`,
            }}
            /> 

          )
        }

  
      </div>

        <div className="mt-5">

        {/* <ul className="list-unstyled d-flex w-100 justify-content-between">
          {
            [...Array(6)].map((_,index) => {
              return <li key={index} className='list-unstyled'> {stages[index]}  </li>
            })
          }
        </ul> */}


      <input
        type="range"
        min="1"
        max="6000"
        value={sliderValue}
        onChange={handleSliderChange}
        className="range-slider"
      />

      {/* <ul className='list-unstyled d-flex justify-content-between'>
          {
            [...Array(3)].map((_, index) => {
              return (
                <li key={index}> {categories[index]}</li>
              )
            })
          }

      </ul> */}
      </div>
    </div>
  );
};

export default App;






// import {useState } from "react";



// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'

// function App() {

//   const [count, setCount] = useState(0);

//   const handleChange = (e) => {

    
//   }




//   return (
//     <>
//     <div className='row justify-content-center '>
//       <div className='vision_block col-md-10 position-relative'>

//           <div className='img_stack'>
          
//           <img src="https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/normal.jpg" alt="normal vision" className='vision_img vision_img_normal w-100 position-absolute top-0 start-0' /> 
//           <img src='https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb.jpg' alt='presbyopia image' className='vision_img vision_img_presbyopia w-100  position-absolute top-0 start-0' />
//           </div>

//           <div style={{marginTop: "400px"}}>
//                 <ul className='list-unstyled d-flex'>
//                   <li className='px-4'> Normal </li>
//                   <li className='px-4 mx-3'> Presbyopia </li>
//                   <li className='px-4 mx-3'> Cataract </li>
//                   <li className='px-4 mx-3' > Monofocal IOL </li> 
//                   <li className='px-4 mx-3'> EDof IOL </li> 
//                   <li className='px-4'> Trifocul IOL </li>
//                 </ul>

//                 <form>
//                   <input type="range" min={1} max={60000} className='w-100' value={count} onChange={handleChange} /> 
//                 </form>

//                 <ul className='list-unstyled d-flex gap-5'>
//                   <li className='mx-5 px-2'> Prior to surgery </li>
//                   <li className='mx-4 px-2'> IOL Implantation </li>
//                   <li className='mx-5'> After Surgery </li>
//                 </ul>


//           </div>



//       </div>
//       </div>

//     </>
//   )
// }

// export default App
