import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
import { RelicCard } from "../features/relics/RelicCard";
import { GeneralButton } from "../components/GeneralButton";
import { RelicTierDropdown } from "../features/relics/RelicTierDropdown";
import { RelicRefinementDropdown } from "../features/relics/RelicRefinementDropdown";
import { useState } from "react";
import { RelicSearchBar } from "../features/relics/RelicSearchBar";
export const RelicsPage = () => {
    const isOpen = useState(false);
    const [selectedTier, setSelectedTier] = useState("");
    const [selectedRefinement, setSelectedRefinement] = useState("Radiant");
    const [vaulted, setVaulted] = useState(true);
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
        
        return matchesTier && matchesVaulted;
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
                return relicA.Radiant.price - relicB.Radiant.price;
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
            <div className="grid grid-cols-5">
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
                <GeneralButton onClickMethod={(e) => setVaulted(!vaulted)} displayLabel={"Vaulted?"}></GeneralButton>
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