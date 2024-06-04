import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

// always need a context and provider for a context.

export const CategoriesContext = createContext({
    categories: {},
});


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); // default value in products is SHOP DATA
    
    // put code to fetch and set products data in useEffect to only fetch on mount since the dependency array is empty.
    useEffect(() => {
        /*addCollectionAndDocuments('categories', SHOP_DATA); // create a collection in firestore called categories and add the data in SHOP_DATA*/
        // fetch data.
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
           // console.log(categoryMap);
            setCategoriesMap(categoriesMap);
            
        };

        getCategoriesMap();
        // if the data returned is not null (data exists).
        // set json data to the products member of the products state.
    }, []);

    const value = { categoriesMap }

    return (
        <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
    )
};

