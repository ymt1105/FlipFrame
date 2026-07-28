import { getItemData } from "../../services/itemdata";
import { useState, useEffect } from "react";
import { RankSelect } from "../ui/RankSelect";

export const Top5OrderBook = ({ slug }) => {
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rank, setRank] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getItemData(slug, rank);
            setPriceData(data);
        } catch (error) {
            console.error("Failed to fetch price data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [slug, rank]);

    if (loading) return <div>Loading order book...</div>;
    if (!priceData) return <div>No data available</div>;

    const maxRank = priceData.info.maxRank;
    const currSellPrice = priceData.response.currSellPrice;
    const currBuyPrice = priceData.response.currBuyPrice;
    const projectedRealPrice = priceData.response.projectedRealPrice;
    const topPrices = priceData.response.topPrices;

    const maxRows = Math.max(topPrices?.sell?.length || 0, topPrices?.buy?.length || 0);

    const rowIndices = Array.from({ length: maxRows }, (_, i) => i);
    return (
        <div className = "border 1px shadow-xl rounded-md p-4">
            {(priceData.info?.tags?.includes("arcane_enhancement") || priceData.info?.tags?.includes("mod")) && (
                <RankSelect rank = {rank} setRank={setRank} maxRank={maxRank}/>
            )}
            <div className="grid grid-cols-2">
                <div>
                    
                    <table className = "center">
                        <thead>
                            <tr className="border-gray-200 dark:border-gray-800">
                                <th scope="col" className="font-semibold bg-rose-300">Sell</th>
                                <th scope="col" className="font-semibold bg-green-300">Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowIndices.map((index) => {
                                const sellItem = topPrices?.sell?.[index];
                                const buyItem = topPrices?.buy?.[index];
                                
                                return (
                                    <tr key={index}>
                                        <td className="text-rose-900">
                                            {sellItem ? `${sellItem.perTrade > 1 ? (sellItem.platinum / sellItem.perTrade).toFixed(0) : sellItem.platinum}p` : "None"}
                                        </td>
                                        <td className="text-green-900">
                                            {buyItem ? `${buyItem.perTrade > 1 ? (buyItem.platinum / buyItem.perTrade).toFixed(0) : buyItem.platinum}p` : "None"}
                                        </td>                            
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <p>Current Sell Price: {currSellPrice}</p>
                    <p>Acceptable Buy Price: {currBuyPrice}</p>
                    <p>Spread: {currSellPrice - currBuyPrice}</p>
                    <p>Projected Real Price: {projectedRealPrice}</p>
                </div>
            </div>
        </div>
    )
}