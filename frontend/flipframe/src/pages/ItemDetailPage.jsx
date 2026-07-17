import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { AddItemControls } from "../components/AddItemControls";
import { useState } from "react";
import { useHoldings } from "../context/HoldingsContext"
import { useWatchlist } from "../context/WatchlistContext";
import { Top5OrderBook } from "../components/Top5OrderBook";
import { getItemData } from "../services/itemdata";
import { RankSelect } from "../components/RankSelect";

export const ItemDetailPage = () => {
    const { slug } = useParams();
    const [localQty, setLocalQty] = useState(1);
    const { addHoldings } = useHoldings();
    const { addWatchlist } = useWatchlist();


    const {data : itemResponse, isLoading} = useQuery({
        queryKey: ["item", slug],
        queryFn: () => getItemData(slug)
    });

    if (isLoading) return <div>Loading...</div>;

    
    const handleAddToWatchlist = (e) => {
        e.preventDefault();
        addWatchlist(slug);
    }

    const handleAddToHoldings = (e) => {
        e.preventDefault();
        addHoldings(slug, localQty);
    }

    const itemName = itemResponse?.response.itemName;
    const imageURL = itemResponse?.response.imageURL;
    
    return (
        <div>
            <p className = "text-5xl font-bold">{itemName}</p> 
            <img src ={imageURL}/>
            <Top5OrderBook slug = {slug}/>
            <AddItemControls 
                value = {localQty}
                onChange = {setLocalQty}
            />
            <div className="grid grid-cols-2">
                <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                <button onClick={handleAddToHoldings}>Add to Holdings</button>
            </div>  
        </div>
    );
}