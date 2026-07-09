import { getItemData } from "../services/pricedata";
import { useState, useEffect } from "react";

export const Top5OrderBook = ({ slug }) => {
    const [priceData, setPriceData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getItemData(slug);
            setPriceData(data);
        } catch (error) {
            console.error("Failed to fetch price data:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [slug]);

    if (loading) return <div>Loading order book...</div>;
    if (!priceData) return <div>No data available</div>;

    const currSellPrice = priceData[0]
    const currBuyPrice = priceData[1]
    const projectedRealPrice = priceData[2]
    const topPrices = priceData[3]

    const maxRows = Math.max(topPrices?.sell?.length || 0, topPrices?.buy?.length || 0);

    const rowIndices = Array.from({ length: maxRows }, (_, i) => i);
    return (
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
                                <td className="text-rose-900">{sellItem ? `${sellItem.platinum}p` : "None"}</td>
                                <td className="text-green-900">{buyItem ? `${buyItem.platinum}p` : "None"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p>Current Sell Price: {currSellPrice}</p>
            <p>Acceptable Buy Price:{currBuyPrice}</p>
            <p>Projected Real Price: {projectedRealPrice}</p>
        </div>
    )
}