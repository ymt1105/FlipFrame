import { getAllOrders, getItemInfo, getOrdersOnItem } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { AddItemControls } from "../components/AddItemControls";
export const ItemDetailPage = () => {
    const { slug } = useParams(); // Get the string slug directly
    const { data: itemResponse, isLoading } = useQuery({
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


    if (!info) return <div>Item not found</div>;
    const handleAddToWatchlist = () => {
        // both these codes should be quite similar, however watch list will only store one of each id
    }

    const handleAddToHoldings = () => {
        //probably uses a name : quantity system
    }
    return (
        <div>
            <h1>{info.i18n.en.name}</h1> 
            <img src ={image}/>
            <p>Trading Tax: {info.tradingTax}</p>
            <p>Ducats: {info.ducats}</p>
            <p>Current Sell Price:{currSellPrice}</p>
            <p>Acceptable Buy Price:{currBuyPrice}</p>
            <p>Projected Real Price: PLACEHOLDER</p>
            <AddItemControls></AddItemControls>
            <div className="grid grid-cols-2">
                <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                <button onClick={handleAddToHoldings}>Add to Holdings</button>
            </div>
        </div>
    );
}