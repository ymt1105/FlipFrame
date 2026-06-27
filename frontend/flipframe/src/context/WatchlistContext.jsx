import { createContext, useContext, useState, useEffect } from "react"

export const WatchlistContext = createContext();
export const WatchlistProvider = ({children}) => {
    const [watchlist, setWatchlist] = useState([]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export const useWatchlist = () => useContext(WatchlistContext);