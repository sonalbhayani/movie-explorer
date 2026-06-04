import Home from "./Home";
import Navbar from "./Navbar";
import MovieDetail from "./MovieDetail";
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
 

  return (
    
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/movie/:imdbID" element={<MovieDetail/>}/>
     </Routes>
     </BrowserRouter>
   
     
    
  )
}

export default App
