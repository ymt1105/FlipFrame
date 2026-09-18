import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
import { RelicCard } from "../features/relics/RelicCard";
import { GeneralButton } from "../components/GeneralButton";
import { useState, useMemo } from "react";
import { RelicSearchBar } from "../features/relics/RelicSearchBar";
export const RelicsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setQuery] = useState("");
    const [selectedTier, setSelectedTier] = useState("");
    const [selectedRefinement, setSelectedRefinement] = useState("Intact");
    const [selectedSquadSize, setSelectedSquadSize] = useState(1);
    const [vaultedIndex, setVaultedIndex] = useState(0);
    const [ownedIndex, setOwnedIndex] = useState(0);
    const [sortingOrder, setSortingOrder] = useState("dscRad")
    const {data: relics, isLoading} = useQuery({
        queryKey: ["relics"],
        queryFn: getAllRelics
    })

    const refinementChances = {
        'Intact' : {
            'Common' : 0.2533,
            'Uncommon' : 0.11,
            'Rare' : 0.02
        },
        'Exceptional' : {
            'Common' : 0.2333,
            'Uncommon' : 0.13,
            'Rare' : 0.04
        },
        'Flawless' : {
            'Common' : 0.2,
            'Uncommon' : 0.17,
            'Rare' : 0.06
        },
        'Radiant' : {
            'Common' : 0.1667,
            'Uncommon' : 0.20,
            'Rare' : 0.1
        }
    };
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
    const currentVaultedState = vaultedStates[vaultedIndex];
    const currentOwnedState = ownedStates[ownedIndex];
    const relicData = useMemo(() => {
        return Object.entries(relics?.data || {});
    }, [relics?.data]);
    const filteredRelics = useMemo(() => { 
        if (!relicData) return [];

        return relicData?.filter(([relicName, relicInfo]) => {
            const relicDrops = relicInfo.drops;
            const matchesTier = selectedTier === "" || relicInfo.relicType === selectedTier;
            let matchesQuery = true
            if (searchQuery != ""){
                const cleanedSearchQuery = searchQuery.replace(/relic/gi, '').trim().toLowerCase();
                if (hasSubstringDeep(relicDrops, searchQuery)){
                    matchesQuery = true;
                } else {

                    matchesQuery = relicName.toLowerCase().includes(cleanedSearchQuery);
                }
            }
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

                return matchesTier && matchesVaulted && matchesQuery && matchesOwned;
            } else if (vaultedIndex === 2){
                matchesVaulted = relicInfo.vaulted === false;

                return matchesTier && matchesVaulted && matchesQuery && matchesOwned;
            } else {
                return matchesTier && matchesQuery && matchesOwned;
            }
        });
    }, [relicData, searchQuery, selectedTier, selectedRefinement, selectedSquadSize, vaultedIndex, ownedIndex]);


    if (isLoading) return <div>Loading...</div>;

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    }
    const handleVaultedToggle = () => {

        setVaultedIndex((prevIndex) => (prevIndex + 1) % vaultedStates.length);
    }
    const handleOwnedToggle = () => {
        setOwnedIndex((prevIndex) => (prevIndex + 1) % ownedStates.length);
    }
    
    
    // P(1rare) = 1-((1-0.1)^4) one rare from 4 radiants
    // Probability of getting 1 x is P(1i) = 1 - ((1-P(item_probability)^t)) where t is the amount of teammates
    // E(relicRadiant) = P(1c) * ((item_c1 + item_c2 + item_c3)/length_common) + P(1u) * ((item_u1 + item_u2)/length_uncommon) + * P(1r) * (item_r1)

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
            <RelicSearchBar onChange = {setQuery}/>
            <div className="grid grid-cols-7">
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
                <select id="squad-select" value={selectedSquadSize} onChange={(e) => setSelectedSquadSize(e.target.value)}>
                    <option value="1">1 Players</option>
                    <option value="2">2 Players</option>
                    <option value="3">3 Players</option>
                    <option value="4">4 Players</option>
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
                        <RelicCard relic = {relic[1]} key = {relic[0]} squad = {selectedSquadSize} chance={refinementChances[selectedRefinement]}/>
                    );
                })}
            </div>
        </div>
    )
}

function hasSubstringDeep(obj, searchQuery) {
    if (obj === null || typeof obj !== 'object') {
        return false;
    }

    for (const key of Object.keys(obj)) {
        if (key.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
        }

        const value = obj[key];
        if (
        (typeof value === 'string' || typeof value === 'number') &&
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ) {
        return true;
        }

        if (hasSubstringDeep(value, searchQuery)) {
        return true;
        }
    }

    return false;
}