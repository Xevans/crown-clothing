import { createContext, useState, useEffect } from "react";
import PRODUCTS from '../shop-data.json';

// always need a context and provider for a context.

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});


export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS); // default value in products is PRODUCTS
    const value = { products};

    /*
    // put code to fetch and set products data in useEffect to only fetch on mount.
    useEffect(() => {
        // fetch data.
        // if the data returned is not null (data exists).
        // set json data to the products member of the products state.
    });*/

    return (
        <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
    )
};

