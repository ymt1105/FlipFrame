import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
import { RelicCard } from "../features/relics/RelicCard";
import { GeneralButton } from "../components/GeneralButton";
import { useState } from "react";
import { RelicSearchBar } from "../features/relics/RelicSearchBar";
export const RelicsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState("");
    const [selectedRefinement, setSelectedRefinement] = useState("");
    //add a third state of both
    const [vaultedIndex, setVaultedIndex] = useState(0);
    const [ownedIndex, setOwnedIndex] = useState(0);
    const [sortingOrder, setSortingOrder] = useState("dscRad")
    const {data: relics, isLoading} = useQuery({
        queryKey: ["relics"],
        queryFn: getAllRelics
    })
    const vaultedStates = [
        { label: 'All', color: 'bg-indigo-300' },
        { label: 'Vaulted', color: 'bg-green-300' },
        { label: 'Unvaulted', color: 'bg-red-300' }
    ];
    const ownedStates = [
        { label: 'All', color: 'bg-indigo-300' },
        { label: 'Owned', color: 'bg-green-300' },
        { label: 'Unowned', color: 'bg-red-300' }
    ];
    if (isLoading) return <div>Loading...</div>;

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    }
    const handleVaultedToggle = () => {

        setVaultedIndex((prevIndex) => (prevIndex + 1) % vaultedStates.length);
    }
    const handleOwnedToggle = () => {
        setOwnedIndex((prevIndex) => (prevIndex + 1) % ownedStates.length);
        console.log(ownedIndex);
        console.log(ownedStates[ownedIndex]);
    }
    const currentVaultedState = vaultedStates[vaultedIndex];
    const currentOwnedState = ownedStates[ownedIndex];
    const relicData = Object.entries(relics.data);
    const filteredRelics = relicData?.filter(([relicName, relicInfo]) => {
        const matchesTier = selectedTier === "" || relicInfo.relicType === selectedTier;
        let matchesVaulted = false;
        let matchesOwned = false;
        if (ownedIndex === 1){
            matchesOwned = relicInfo.isOwned === true;
        } else if (ownedIndex === 2){
            matchesOwned = relicInfo.isOwned === false;
        } else {
            matchesOwned = true;
        }

        if (vaultedIndex === 1){
            matchesVaulted = relicInfo.vaulted === true;

            return matchesTier && matchesVaulted && matchesOwned;
        } else if (vaultedIndex === 2){
            matchesVaulted = relicInfo.vaulted === false;

            return matchesTier && matchesVaulted && matchesOwned;
        } else {
            return matchesTier && matchesOwned;
        }
        
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
                <GeneralButton onClickMethod={handleVaultedToggle} className = {currentVaultedState.color} displayLabel={currentVaultedState.label}></GeneralButton>
                <GeneralButton onClickMethod={handleOwnedToggle} className = {currentOwnedState.color} displayLabel={currentOwnedState.label}></GeneralButton>
                <div className="flex items-center">
                    <GeneralButton onClickMethod={toggleDropdown} displayLabel={"Platinum Filter"}></GeneralButton>
                    {isOpen && (
                        <div className="dropdown-menu">
                            <p>Greater than</p>
                            <input type="range"/>

                        </div>
                    )

                    }
                </div>
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