import { useQuery } from "@tanstack/react-query";
import { getItemData } from "../../services/itemdata";
import { useState } from "react";
import { RankSelect } from "../ui/RankSelect";

export const Top5OrderBook = ({ slug }) => {
    const [rank, setRank] = useState(0);

    const {
        data: priceData,
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["itemData", slug, rank],
        queryFn: () => getItemData(slug, rank),

        retry: (failureCount, error) => {
            if (error?.response?.status === 429 || error?.status === 429) {
                return failureCount < 4;
            }
            return failureCount < 2;
        },

        retryDelay: (attemptIndex, error) => {
            const retryAfter = error?.response?.headers?.get('Retry-After');
            if (retryAfter) {
                return parseInt(retryAfter, 10) * 1000;
            }
            return Math.min(1000 * (2 ** attemptIndex), 10000);
        },
    });

    if (isLoading) return <div>Loading order book...</div>;
    if (isError || !priceData) return (
        <div>
            <p className="text-red-500">Failed to load order book (Rate limited or server error).</p>
            <button onClick={() => refetch()} className="text-xs bg-gray-200 p-1 rounded mt-1">
                Retry Now
            </button>
        </div>
    );

    const maxRank = priceData?.info?.maxRank;
    const currSellPrice = priceData?.response?.currSellPrice;
    const currBuyPrice = priceData?.response?.currBuyPrice;
    const projectedRealPrice = priceData?.response?.projectedRealPrice;
    const topPrices = priceData?.response?.topPrices;

    const maxRows = Math.max(topPrices?.sell?.length || 0, topPrices?.buy?.length || 0);
    const rowIndices = Array.from({ length: maxRows }, (_, i) => i);

    return (
        <div className="border 1px shadow-xl rounded-md p-4">
            {(priceData?.info?.tags?.includes("arcane_enhancement") || priceData?.info?.tags?.includes("mod")) && (
                <RankSelect rank={rank} setRank={setRank} maxRank={maxRank} />
            )}
            <div className="grid grid-cols-2">
                <div>
                    <table className="center">
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
    );
};