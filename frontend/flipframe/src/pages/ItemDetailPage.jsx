import { getAllOrders, getItemInfo, getOrdersOnItem } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
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
    console.log(topPrices);
    const currSellPrice = topPrices.sell[0].platinum;
    //TODO: still need to analyse the prices to figure out if this is correct buy price
    const currBuyPrice = topPrices.buy[0].platinum;
    //TODO: look at 2d graph to figure out the actual price
    const projectedRealPrice;

    if (!info) return <div>Item not found</div>;

    return (
        <div>
            <h1>{info.i18n.en.name}</h1> 
            <p>Trading Tax: {info.tradingTax}</p>
            <p>Ducats: {info.ducats}</p>
            <p>Current Sell Price:{currSellPrice}</p>
            <p>Acceptable Buy Price:{currBuyPrice}</p>
            <p>Projected Real Price:{}</p>
        </div>
    );
}