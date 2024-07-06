import { createContext, useState } from 'react';


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
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));


    const setTokenWithStorage = (newToken:string | null) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{
            token,
            setTokenWithStorage,
        }}>
            {children}
        </AuthContext.Provider>
    )
}