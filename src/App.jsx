import WithAstigmatism from "./pages/WithAstigmatism.jsx";
import WithoutAstigmatism from "./pages/WithoutAstigmatism.jsx";

import { BrowserRouter, Routes, Route  } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<WithoutAstigmatism /> } /> 
            <Route path="/with-astigmatism" element={<WithAstigmatism /> } /> 
        </Routes>
    
    </BrowserRouter>
  
  )
}

export default App;