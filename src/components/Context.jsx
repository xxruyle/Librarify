import { createContext, useState } from "react";
import App from "./App.jsx"

export const CartContext = createContext({
    cart: [], 
    handleAddToCart: () => {}, 
    handleRemoveFromCart: () => {},
});

function Context()
{
    const [cart, setCart] = useState([]);

    const handleAddToCart = (book, amount) => {
        console.log(book);
        const duplicateFound = cart.find((val) => val.id === book.id);

        if (!duplicateFound)   {
        book.amount = amount;
        setCart([...cart, book]);
        } 
        console.log(cart);
    }

    const handleRemoveFromCart = (id) => {
        let copyCart = [...cart];
        const index = copyCart.findIndex((book) => book.id === id);

        if (index !== -1) {
            copyCart.splice(index, 1); 
            setCart(copyCart);
        }
    }

    return (
        <CartContext.Provider value={{cart, handleAddToCart, handleRemoveFromCart}}>
            <App/>
        </CartContext.Provider>
    );
}

export default Context; 