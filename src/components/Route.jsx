import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./Home.jsx"
import Browse from "./Browse.jsx";
import Cart from "./Cart.jsx"

const routes = [
    {
        path: "/",
        element: <Home/>

    },
    {
        path: "browse/*",
        element: <Browse/>

    },
    {
        path: "cart",
        element: <Cart/>
    },
];


const router = createBrowserRouter(routes)

export default router; 