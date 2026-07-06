import { TickerCard } from "../components/TickerCard"
import { useWatchlist} from "../context/WatchlistContext"

export const WatchlistPage = () => {
    const { watchlist, setWatchlist } = useWatchlist();

    return (
        <div>
            <ul>
                {watchlist.map((itemSlug) => (
                    <li key = {itemSlug}>
                        <TickerCard 
                            itemSlug={itemSlug}
                        />
                    </li>
                ))} 
            </ul>
        </div>    
    )
}