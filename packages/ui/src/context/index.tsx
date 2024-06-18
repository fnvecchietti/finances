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
