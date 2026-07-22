import { createContext, useContext, useState, useEffect } from "react"

export const WatchlistContext = createContext();
export const WatchlistProvider = ({children}) => {
    const [watchlist, setWatchlist] = useState(() => {
        return JSON.parse(localStorage.getItem("Watchlist") || "[]");
    });
    
    useEffect(() => {
        localStorage.setItem("Watchlist", JSON.stringify(watchlist))
    }, [watchlist]);

    useEffect(() => {
        const handleWatchListChanges = (event) => {

        }
    })

    const addWatchlist = (slug) => {
        setWatchlist((prevWatchlist) => {
            const rawWatchlist = localStorage.getItem("Watchlist") || "[]";
            const currentWatchlist = JSON.parse(rawWatchlist);
            const uniqueWatchlist = [...new Set([...currentWatchlist, slug])];
            localStorage.setItem("Watchlist", JSON.stringify(uniqueWatchlist));
            return uniqueWatchlist;
        })
    }
    const deleteAllTickers = () => {
        localStorage.remove("Watchlist");
        setWatchlist([])
        return;
    }

    
    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist, addWatchlist, deleteAllTickers }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export const useWatchlist = () => useContext(WatchlistContext);