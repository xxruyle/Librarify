import "../styles/main.css"
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "./Home.jsx"
import Browse from "./Browse.jsx";
import Cart from "./Cart.jsx"


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="browse/*" element={<Browse/>}/>
        <Route path="cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
