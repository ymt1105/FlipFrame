import { getAllOrders, getItemInfo, getOrdersOnItem } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { AddItemControls } from "../components/AddItemControls";
import { useState } from "react";
import { useHoldings } from "../context/HoldingsContext"
import { useWatchlist } from "../context/WatchlistContext";
import { Top5OrderBook } from "../components/Top5OrderBook";

export const ItemDetailPage = () => {
    const { slug } = useParams(); // Get the string slug directly

    

    const [localQty, setLocalQty] = useState(1);
    const { addHoldings } = useHoldings();
    const { addWatchlist } = useWatchlist();


        const {data : itemResponse, isLoading} = useQuery({
        queryKey: ["item", slug],
        queryFn: () => getItemInfo(slug)
    });
    const { data: priceData} = useQuery({
        queryKey: ["price", slug],
        queryFn: () => getOrdersOnItem(slug)
    })


    if (isLoading) return <div>Loading...</div>;
    const info = itemResponse?.data;
    const topPrices = priceData?.data;
    const currSellPrice = topPrices?.sell[0].platinum;
    //TODO: still need to analyse the prices to figure out if this is correct buy price
    const currBuyPrice = topPrices?.buy[0].platinum;
    //TODO: look at 2d graph to figure out the actual price
    const projectedRealPrice = "";

    const image = `https://warframe.market/static/assets/${info.i18n.en.thumb}`
    const handleAddToWatchlist = (e) => {
        e.preventDefault();
        addWatchlist(slug);
    }

    const handleAddToHoldings = (e) => {
        e.preventDefault();
        addHoldings(slug, localQty);
    }
    return (
        <div>
            <h1>{info.i18n.en.name}</h1> 
            <img src ={image}/>
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