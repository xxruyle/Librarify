import { CartContext } from "./Context.jsx";
import Template from "./Template";
import { useContext } from "react";


function CartedBook({book}) 
{
    const {handleRemoveFromCart} = useContext(CartContext)

    return (
        <div className="cartedbook-container" key={book.id}>
            <img className="cartedbook-cover" src={book.coverImage} alt={book.title}/>

            <div className="cartedbook-info-container">
                <div className="cartedbook-title">{book.title}</div>
                <div className="cartedbook-price">{book.price}</div>
                <div className="cartedbook-price">Quantity: {book.amount}</div>
                <button onClick={() => handleRemoveFromCart(book.id)} className="cartedbook-remove">Remove</button>
            </div>

        </div>
    );
}

function Cart() 
{
    const { cart } = useContext(CartContext);

    const numBooksMessage = (cart.length > 0) ?  `` : 
    `Your cart is empty`;


    return (
        <Template>
            <h1>{numBooksMessage}</h1>
            <ul className="cart-container">
                {cart.map((book) => {
                    return <CartedBook key={book.id} book={book}/>
                })}
            </ul>
            {(cart.length > 0) ? (
                <button className="cartedbook-checkout">Checkout</button>
            ) : <></>}
        </Template>
    );
}

export default Cart; 