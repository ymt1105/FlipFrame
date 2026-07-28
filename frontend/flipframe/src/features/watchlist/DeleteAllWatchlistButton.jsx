import {useWatchlist} from "../../context/WatchlistContext"
export const DeleteAllWatchlistButton = () => {
    const {deleteAllWatchlist} = useWatchlist();
    return (
        <div>
            <button onClick = {deleteAllWatchlist}>Delete All Watchlist</button>
        </div>
    )
}