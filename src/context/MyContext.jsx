import { createContext } from "react";
import { useMyContextProvider } from "../hooks/useMyContext";

export const MyContext = createContext();

export function MyContextProvider({children}){
    const value = useMyContextProvider();

    return(
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};
