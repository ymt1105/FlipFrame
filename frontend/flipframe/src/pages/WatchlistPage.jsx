import { WatchlistCard } from "../features/watchlist/WatchlistCard"
import { useWatchlist} from "../context/WatchlistContext"
import { GeneralButton } from "../components/GeneralButton";

export const WatchlistPage = () => {
    const { watchlist, setWatchlist, deleteAllWatchlist } = useWatchlist();

    return (
        <div className = "gap-6 px-6 py-6">
            <GeneralButton onClickMethod={deleteAllWatchlist} displayLabel={"Delete All Watchlist Items"}/>
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