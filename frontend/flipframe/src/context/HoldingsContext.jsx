import { createContext, useContext, useState, useEffect } from "react"

export const HoldingsContext = createContext();
export const HoldingsProvider = ({children}) => {
    const [holdings, setHoldings] = useState(() => {
        return JSON.parse(localStorage.getItem("Holdings") || "[]");
    })

    useEffect(() => {
        localStorage.setItem("Holdings", JSON.stringify(holdings))
    }, [holdings]);

    useEffect(() => {
        const handleHoldingsChanges = (event) => {
        }
    })

    const addHoldings = (slug, quantity) => {
        setHoldings((prevHoldings) => {
            const currentQuantity = prevHoldings[slug] || 0;
            const nextHoldings = {
                ...prevHoldings,
                [slug]: currentQuantity + quantity
            };

            localStorage.setItem("Holdings", JSON.stringify(nextHoldings));


            return nextHoldings
        })
    }



    return (
        <HoldingsContext.Provider value={{ holdings, setHoldings, addHoldings }}>
            {children}
        </HoldingsContext.Provider>
    );
}

export const useHoldings = () => useContext(HoldingsContext);