import { createContext, useState, useEffect } from "react";
// want to wrap the top level component app inside of the context, 
//so that the entire project has access to this context (being the user object)
// We do this to avoid passing props everywhere for the user object since we recieve it in the sign in component but no where else.
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"; 



// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // Recall we implement useEffect when there is code we only want to run when this component is mounted for the first time.
    // If we implement the listener without this, it will always be listening
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            
            // Will create a user document/record in the db if they dont have one, otherwise it will just return the existing user document reference
            // helps with google sign in situations.
            if (user) {
                createUserDocumentFromAuth(user);
            }

            // we know that user will be returned updated with either an authenticated user or null
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}