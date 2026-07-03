import { createContext, useContext, useState, useEffect } from "react"

export const WatchlistContext = createContext();
export const WatchlistProvider = ({children}) => {
    const [watchlist, setWatchlist] = useState(() => {
        return JSON.parse(localStorage.getItem("watchlist") || "[]");
    });
    


    
    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export const useWatchlist = () => useContext(WatchlistContext);