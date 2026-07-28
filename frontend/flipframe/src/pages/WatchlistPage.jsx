import { DeleteAllWatchlistButton } from "../features/watchlist/DeleteAllWatchlistButton";
import { WatchlistCard } from "../features/watchlist/WatchlistCard"
import { useWatchlist} from "../context/WatchlistContext"

export const WatchlistPage = () => {
    const { watchlist, setWatchlist } = useWatchlist();

    return (
        <div className = "gap-6 px-6 py-6">
            <DeleteAllWatchlistButton/>
            <ul>
                {watchlist.map((itemSlug) => (
                    <li key = {itemSlug} className="py-2">
                        <WatchlistCard 
                            itemSlug={itemSlug}
                        />
                    </li>
                ))} 
            </ul>
        </div>    
    )
}