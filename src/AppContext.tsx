import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {User} from "@/types/user.type.ts";

// Define the shape of the context
interface AppContextType {
    user: User | undefined;
    setUser: (data: User) => void;
}

// Create the context with a default value (undefined)
const AppContextAPI = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppContext: React.FC<{ children: ReactNode }> = ({children}) => {

    const [user, setUser] = useState<User | undefined>(() => {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user)
        }
        return undefined
    });

    useEffect(() => {
        localStorage.setItem("user", user ? JSON.stringify(user) : "");
    }, [user])

    return (
        <AppContextAPI.Provider value={{user, setUser}}>
            {children}
        </AppContextAPI.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContextAPI);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default AppContext;