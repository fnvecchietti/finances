import { createContext, useEffect, useState } from 'react';


export const FinancesContext = createContext<any>({})


export const FinancesProvider = ({children} : {children: React.ReactElement}) => {
    const [count, setCount] = useState(0)
    const [filter, setFilter] = useState('')
    

    return (
        <FinancesContext.Provider value={{
            count,
            setCount,
            filter,
            setFilter,
        }}>
            {children}
        </FinancesContext.Provider>
    )
}


export const AuthContext = createContext<any>({})

export const AuthProvider = ({children} : {children: React.ReactElement}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=> {
        const t = localStorage.getItem('token')
        t? setIsAuthenticated(true) : setIsAuthenticated(false);
    },[])
    
    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
}