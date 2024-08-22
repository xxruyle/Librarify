import {createContext, useEffect, useState} from "react";
import "../styles/main.css";
import {Link, useLocation} from "react-router-dom";
import { useContext } from "react";
import {CartContext} from "./Context.jsx"


function NavItem({id, text, link, cartCount}) {
    const {cart} = useContext(CartContext);
    const loc = useLocation()
    const style = (loc.pathname === link) ? "navItem-selected" : "navItem";

    let linkItem;
    if (link === "/cart") {
        linkItem = <Link to={link}>{text} ({cart.length})</Link>
    } else { 
        linkItem = <Link to={link}>{text}</Link>
    }

    return (
        <>
            <li key={id} className={style}>{linkItem}</li>  
        </>
    );
}

function Navbar({cartCount}) {
    return (
        <div className="nav">
            <Link to="/"><h1 className="navTitle">Librarify</h1></Link>
            <ul className="navBarList">
                <NavItem id={1} text={"Cart"} link={"/cart"} 
                cartCount={cartCount} />

                <NavItem id={2} text={"Browse"} link={"/browse"}
                 cartCount={0} />
            </ul>
        </div>
    );
}

export default Navbar;
