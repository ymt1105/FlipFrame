import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
import { RelicCard } from "../features/relics/RelicCard";
import { GeneralButton } from "../components/GeneralButton";
import { useState } from "react";
import { RelicSearchBar } from "../features/relics/RelicSearchBar";
export const RelicsPage = () => {
    const isOpen = useState(false);
    const [selectedTier, setSelectedTier] = useState("");
    const [selectedRefinement, setSelectedRefinement] = useState("");
    //add a third state of both
    const [vaulted, setVaulted] = useState(true);
    const [owned, setOwned] = useState(true);
    const [sortingOrder, setSortingOrder] = useState("dscRad")
    const {data: relics, isLoading} = useQuery({
        queryKey: ["relics"],
        queryFn: getAllRelics
    })
    if (isLoading) return <div>Loading...</div>;

    const setIsOpen = () =>{
        console.log("popup");
    }
    
    const relicData = Object.entries(relics.data);
    const filteredRelics = relicData?.filter(([relicName, relicInfo]) => {
        const matchesTier = selectedTier === "" || relicInfo.relicType === selectedTier;
        const matchesVaulted = relicInfo.vaulted === vaulted;
        const matchesOwned = relicInfo.isOwned === owned;
        return matchesTier && matchesVaulted && matchesOwned;
    });
    const sortedAndFilteredRelics = [...filteredRelics].sort((a, b) => {
        const relicA = a[1];
        const relicB = b[1];
        if (sortingOrder === "ascRad") {
            if (selectedRefinement == ""){
                return relicA.Radiant.price - relicB.Radiant.price;
            } else {
                return relicA[selectedRefinement].price - relicB[selectedRefinement].price;
            }
        } else if (sortingOrder === "dscRad") {
            if (selectedRefinement == ""){
                return relicB.Radiant.price - relicA.Radiant.price;
            } else {
                return relicB[selectedRefinement].price - relicA[selectedRefinement].price;
            }
        } else if (sortingOrder === "ascDiff") {
            return relicA.upgradeDiff - relicB.upgradeDiff;
        } else if (sortingOrder === "dscDiff") {
            return relicB.upgradeDiff - relicA.upgradeDiff;
        }
        return 0;
    });
    
    return (
        <div>
            <RelicSearchBar/>
            <div className="grid grid-cols-6">
                <select id="tier-select" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                    <option value="">Unsorted</option>
                    <option value="Lith">Lith</option>
                    <option value="Meso">Meso</option>
                    <option value="Neo">Neo</option>
                    <option value="Axi">Axi</option>
                </select>
                <select id="tier-select" value={selectedRefinement} onChange={(e) => setSelectedRefinement(e.target.value)}>
                    <option value="">Unsorted</option>
                    <option value="Intact">Intact</option>
                    <option value="Exceptional">Exceptional</option>
                    <option value="Flawless">Flawless</option>
                    <option value="Radiant">Radiant</option>
                </select>
                {/* Less than or greater than filter */}

                <select id="tier-select" value={sortingOrder} onChange={(e) => setSortingOrder(e.target.value)}>
                    <option value="dscRad">Descending Radiant</option>
                    <option value="ascRad">Ascending Radiant</option>  
                    <option value="dscDiff">Descending Difference</option>
                    <option value="ascDiff">Ascending Difference</option>  
                    <option value="uns">Unsorted</option>
                </select>
                <GeneralButton onClickMethod={(e) => {setVaulted(!vaulted); console.log(vaulted)}} className = {vaulted === true ? "bg_green-300" : "bg-red-500"} displayLabel={"Vaulted?"}></GeneralButton>
                <GeneralButton onClickMethod={(e) => {setOwned(!owned); console.log(owned)}} className = {owned === true ? "bg-green-300" : "bg-red-500"} displayLabel={"Owned?"}></GeneralButton>
                <GeneralButton onClickMethod={() => setIsOpen(!isOpen)} displayLabel={"Platinum Filter"}></GeneralButton>
            </div>
            <div className="grid grid-cols-5">
                {Object.entries(sortedAndFilteredRelics).map(relic => {
                    return (
                        <RelicCard relic = {relic[1]} key = {relic[0]}/>
                    );
                })}
            </div>
        </div>
    )
}