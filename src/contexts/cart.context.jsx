import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    subtractItemFromCart: () => {},
    removeItemFromCart: () => {},
    totalCartItems: 0,
    getTotalQuantity: () => {},
    totalCartPrice: 0,
    getTotalPrice: () => {},    
});

// helper function for addItemsToCart
const addCartItem = (cartItems, productToAdd) => {
    // check if item to add actually exists 
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


// helper function for subtractCartItem (unused)
const subtractCartItem = (cartItems, productToSubtract) => {
    // // check if item to subtract actually exists
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToSubtract.id);

     // check if quantity one, if so remove item
    // filter can return an array with the target removed
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToSubtract.id); // says: return every cart item to a new array except the cart item that matches the ID of the target
    }


    //if quantity is > 1,
    // return beck cart array with cart item quantity decremented
    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToSubtract.id // if there id's match
                ? { ...cartItem, quantity: cartItem.quantity - 1} // increment the object's quantity
                : cartItem // otherwise keep it the same/ do nothing with it.
        );
    }

};



const removeCartItem = (cartItems, cartItemToRemove) => {
    // check if item to remove actually exists
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // check if quantity one, if so remove item
    // filter can return an array with the target removed
    if(existingCartItem) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id); // says: return every cart item to a new array except the cart item that matches the ID of the target
    } else {
        return cartItems;
    }

}



const getTotalQuantity = (cartItems) => {
    // read through entire array, and add up all quantities, then return the total.
    // reduce is similar to looping each item, accessing an element and doing something with it. Will return the first callback (in this casse, the acumulated quantity of all items)
    return cartItems.reduce((totalQuantity, currentitem) => 
        totalQuantity + currentitem.quantity, 0);

} 

// get total price of all items in cartItems array
const getTotalPrice = (cartItems) => {
    return cartItems.reduce((totalPrice, currentitem) => 
        totalPrice + (currentitem.price * currentitem.quantity), 0);
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
    const [totalCartPrice, setTotalCartPtice] = useState(0);

    
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const subtractItemFromCart = (productToSubtract) => {
        setCartItems(subtractCartItem(cartItems, productToSubtract));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    useEffect(() => { // recall that useEffect will run a codeblock whenever an item in the dependency array change   
        setTotalCartItems(getTotalQuantity(cartItems));
        setTotalCartPtice(getTotalPrice(cartItems));
    }, [cartItems,])
    
    
    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        subtractItemFromCart, 
        cartItems, 
        totalCartItems,
        removeItemFromCart,
        totalCartPrice,}; // values to expose

    return (
        <CartContext.Provider value={value}> {children} </CartContext.Provider>

    )
};