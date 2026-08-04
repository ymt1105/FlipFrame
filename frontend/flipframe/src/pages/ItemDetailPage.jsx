import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { AddItemControls } from "../features/ui/AddItemControls";
import { useState } from "react";
import { useHoldings } from "../context/HoldingsContext"
import { useWatchlist } from "../context/WatchlistContext";
import { Top5OrderBook } from "../features/orders/Top5OrderBook";
import { getItemData } from "../services/itemdata";
import { RankSelect } from "../features/ui/RankSelect";
import { NewOrderForm } from "../features/orders/NewOrderForm";
import { addOrder } from "../services/api";
import { GeneralButton } from "../components/GeneralButton"

export const ItemDetailPage = () => {
    const { slug } = useParams();
    const [localQty, setLocalQty] = useState(1);
    const { addHoldings } = useHoldings();
    const { addWatchlist } = useWatchlist();
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    const handleSubmitOrder = async (updatedOrder) => {
        try {
    
            await addOrder(updatedOrder);    
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    }

    const itemName = itemResponse?.response.itemName;
    const imageURL = itemResponse?.response.imageURL;
    const itemID = itemResponse?.info.id;
    
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
                <GeneralButton onClickMethod={handleAddToWatchlist} displayLabel={"Add to Watchlist"}/>
                <GeneralButton onClickMethod={handleAddToHoldings} displayLabel={"Add to Holdings"}/>
            </div>  
            <GeneralButton onClickMethod={() => setIsModalOpen(true)} displayLabel={"Create Order"}/>
            {isModalOpen && (
                <NewOrderForm itemId = {itemID} itemName = {itemName} onClose = {() => setIsModalOpen(false)} onComplete={handleSubmitOrder}/>
                )
            }
        </div>
    );
}