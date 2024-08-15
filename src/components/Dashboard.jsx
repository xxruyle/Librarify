import {useState} from "react";
import "../styles/main.css"
import Card from "./Card.jsx"


function Dashboard({children}) {
    return (
      <div className="dashBoard">
        {children}
      </div>
    );
}

export default Dashboard; 
