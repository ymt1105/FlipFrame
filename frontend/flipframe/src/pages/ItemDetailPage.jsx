import { getItemInfo } from "../services/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
export const ItemDetailPage = () => {
    const { slug } = useParams(); // Get the string slug directly
    const { data: itemResponse, isLoading } = useQuery({
        queryKey: ["item", slug],
        queryFn: () => getItemInfo(slug)
    });
    if (isLoading) return <div>Loading...</div>;

    const info = itemResponse?.data;
    if (!info) return <div>Item not found</div>;

    return (
        <div>
            <h1>{info.i18n.en.name}</h1> 
            <p>Trading Tax: {info.tradingTax}</p>
            <p>Ducats: {info.ducats}</p>

            <h3>Set Parts:</h3>
            <ul>
                {info.setParts.map((part) => (
                    <li key={part}>{part}</li>
                ))}
            </ul>
        </div>
    );
}