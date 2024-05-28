import { createContext, useState } from "react";
// want to wrap the top level component app inside of the context, 
//so that the entire project has access to this context (being the user object)
// We do this to avoid passing props everywhere for the user object since we recieve it in the sign in component but no where else.


// actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}