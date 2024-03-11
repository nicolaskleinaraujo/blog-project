// Modules
import { createContext, useState } from "react";

// Context
export const AuthContext = createContext()

// Provider
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)

    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}