import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
import { RelicCard } from "../features/relics/RelicCard";
import { GeneralButton } from "../components/GeneralButton";
import { RelicTierDropdown } from "../features/relics/RelicTierDropdown";
import { RelicRefinementDropdown } from "../features/relics/RelicRefinementDropdown";
import { useState } from "react";
export const RelicsPage = () => {
    const isOpen = useState(false);

    const {data: relics, isLoading} = useQuery({
        queryKey: ["relics"],
        queryFn: getAllRelics
    })

    if (isLoading) return <div>Loading...</div>;

    const setIsOpen = () =>{
        console.log("popup");
    }
    return (
        <div>
            <h2>SearchBar</h2>
            <div className="grid grid-cols-5">
                <RelicTierDropdown/>
                <RelicRefinementDropdown/>
                {/* Less than or greater than filter */}
                <button onClick={() => setIsOpen(!isOpen)}>Platinum Filter</button>
                <select id="tier-select">
                    <option value="uns">Unsorted</option>
                    <option value="asc">Ascending</option>
                    <option value="dsc">Descending</option>
                </select>
                <GeneralButton onClickMethod={() => console.log("hello")} displayLabel={"Vaulted?"}></GeneralButton>
            </div>
            <div className="grid grid-cols-5">
                {Object.entries(relics?.data).map(relic => {
                    return (
                        <RelicCard relic = {relic} key = {relic[0]}/>
                    );
                })}
            </div>
            <p>Relic Placeholders</p>
        </div>
    )
}