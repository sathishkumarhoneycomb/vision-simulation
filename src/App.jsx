import React, { useState } from 'react';
import './App.css'; // Assuming you have your styles here

const App = () => {
  const [sliderValue, setSliderValue] = useState(1);
  
  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  // Calculate the interval to determine which image should be on top
  const interval = Math.floor((sliderValue - 1) / 1000);
  const opacityValue = (sliderValue % 1000) / 1000;

  const imageSrc = ["https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/normal.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/presb_cat.jpg", "https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/monofokal.jpg","https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/edof.jpg","https://downloads.zeiss.com/medical/vision-simulation-tool/img/szene1/trifokal.jpg"]

  return (
    <div>
      <div className="image-stack">
        {[...Array(6)].map((_, index) => (
          <img
            key={index}
            src={imageSrc[index]}
            alt={`Image ${index + 1}`}
            style={{
              opacity: index === interval ? 1 : (index === interval + 1 ? opacityValue : 0),
              zIndex: index === interval ? 2 : 1,
              transition: 'opacity 0.3s'
            }}
            className="stack-image"
          />
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="6000"
        value={sliderValue}
        onChange={handleSliderChange}
        className="range-slider"
        // style={{marginTop: "5px"}}
      />
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
