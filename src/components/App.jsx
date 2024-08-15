import { useState } from 'react'
import "../styles/main.css"

import router from "./Route.jsx"
import {createBrowserRouter, RouterProvider } from 'react-router-dom'

import Navbar from './Navbar.jsx'
import Home from "./Home.jsx"
import Browse from "./Browse.jsx";
import Cart from "./Cart.jsx"


function App() {

  const [cart, setCart] = useState([]);

  const handleAddToCart = (book) => {
    const duplicateFound = cart.find((val) => val.id === book.id);

    if (!duplicateFound)   {
      setCart([...cart, book]);
    } 
  }

  const handleRemoveFromCart = (id) => {
      let copyCart = [...cart];
      const index = copyCart.findIndex((book) => book.id === id);

      if (index !== -1) {
        copyCart.splice(index, 1); 
        setCart(copyCart);
      }
  }



  const routes = [
      {
          path: "/",
          element: <Home/>

      },
      {
          path: "browse/*",
          element: <Browse handleAddToCart={handleAddToCart}/>

      },
      {
          path: "cart",
          element: <Cart books={cart} handleRemove={handleRemoveFromCart}/>
      },
  ];

  const router = createBrowserRouter(routes)

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
