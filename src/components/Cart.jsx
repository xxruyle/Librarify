import Template from "./Template";
import { useState } from "react";


function CartedBook({book, handleRemove}) 
{
    return (
        <div className="cartedbook-container" key={book.id}>
            <img className="cartedbook-cover" src={book.coverImage} alt={book.title}/>

            <div className="cartedbook-info-container">
                <div className="cartedbook-title">{book.title}</div>
                <div className="cartedbook-price">{book.price}</div>
                <button onClick={() => handleRemove(book.id)} className="cartedbook-remove">Remove</button>
            </div>
        </div>
    );
}

function Cart({books, handleRemove}) 
{
    return (
        <Template>
            <h1>Your Cart</h1>
            <ul className="cart-container">
                {books.map((book) => {
                    return <CartedBook key={book.id} book={book} handleRemove={handleRemove}/>
                })}
            </ul>
        </Template>
    );
}

export default Cart; 