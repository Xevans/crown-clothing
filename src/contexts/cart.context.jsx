import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalCartItems: 0,
    getTotalQuantity: () => {},    
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

const getTotalQuantity = (cartItems) => {
    // read through entire array, and add up all quantities, then return the total.
    // reduce is similar to looping each item, accessing an element and doing something with it. Will return the first callback (in this casse, the acumulated quantity of all items)
    return cartItems.reduce((totalQuantity, currentitem) => 
        totalQuantity + currentitem.quantity, 0);

} 

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
    const [totalCartItems, setTotalCartItems] = useState(0);

    
    
    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    useEffect(() => { // recall that useEffect will run a codeblock whenever items in the dependency array change   
        setTotalCartItems(getTotalQuantity(cartItems));
    }, [cartItems,])
    
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, totalCartItems}; // values to expose

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>

    )
};