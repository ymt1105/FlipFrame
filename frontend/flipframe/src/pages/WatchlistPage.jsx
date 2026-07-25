import { DeleteAllWatchlistButton } from "../components/DeleteAllWatchlistButton";
import { TickerCard } from "../components/TickerCard"
import { useWatchlist} from "../context/WatchlistContext"

export const WatchlistPage = () => {
    const { watchlist, setWatchlist } = useWatchlist();

    return (
        <div className = "gap-6 px-6 py-6">
            <DeleteAllWatchlistButton/>
            <ul>
                {watchlist.map((itemSlug) => (
                    <li key = {itemSlug} className="py-2">
                        <TickerCard 
                            itemSlug={itemSlug}
                        />
                    </li>
                ))} 
            </ul>
        </div>    
    )
}