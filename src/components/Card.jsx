import {useState} from "react";
import "../styles/main.css"


function Card({children}) {
    return (
        <div className="card">
            {children}
        </div>
    );

}

export default Card;
