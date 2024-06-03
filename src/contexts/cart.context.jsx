import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},    
});

// helper function for addItemsToCart
const addCartItem = (cartItems, productToAdd) => {
    // check if product (2nd arg) exists in cartItems (cart array)
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);


    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id // if there id's match
                ? { ...cartItem, quantity: cartItem.quantity + 1} // increment the object's quantity
                : cartItem // otherwise keep it the same/ do nothing with it.
        );
    }
    
    // no matching product found, add new item.
    return [...cartItems, {...productToAdd, quantity: 1}]; //push productToAdd with quantity set to 1, all other fields are inherited.
};

/*
Product:
{
    id,
    name,
    price,
    imageUrl,
} 

Cart Item:
{
    id,
    name,
    price,
    imageUrl,
    quantity
} 
*/




export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // cart items will hold the cart array

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }
    
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems}; // values to expose

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>

    )
};