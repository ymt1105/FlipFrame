import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getItemContracts } from "../services/api";
import { RivenCard } from "../features/rivens/RivenCard";
import { StatusSelect } from "../features/ui/StatusSelect";
import { RivenAutoCompleteSearch } from "../features/rivens/RivenAutoCompleteSearch.jsx"

export const ContractsPage = () => {
    const { slug } = useParams();
    const [status, setStatus] = useState("ingame");

    const {data : items, isLoading} = useQuery({
        queryKey: ["items", slug],
        queryFn: () => getItemContracts(slug)
    })
    
    if (isLoading) return <div>Loading...</div>;
    const auctions = items?.payload?.auctions || [];
    const filteredAuctions = auctions.filter(contract => {
        const userStatus = contract.owner?.status;
        
        if (status === "all") return true;
        if (status === "online") return userStatus === "online" || userStatus === "ingame";
        if (status === "ingame") return userStatus === "ingame";
        
        return true;
    });
    return (
        <div>
            <RivenAutoCompleteSearch/>
            <StatusSelect status = {status} setStatus={setStatus}/>
            <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 py-6">
                {filteredAuctions.map(contract => {
                    return (
                        <RivenCard 
                            key = {contract.id} 
                            rivenData = {contract}
                        />
                    )
                })}
            </div>
        </div>
    )
}