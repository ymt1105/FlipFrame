import { createContext, useContext, useState, useEffect } from "react"

export const HoldingsContext = createContext();
export const HoldingsProvider = ({children}) => {
    const [holdings, setHoldings] = useState([]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export const useHoldings = () => useContext(HoldingsContext);