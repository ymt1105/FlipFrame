import { useState } from "react";
export function RelicTierDropdown() {
    const [selectedTier, setSelectedTier] = useState('Intact');

    const handleChange = (event) => {
        setSelectedTier(event.target.value);
        console.log("Selected tier:", event.target.value);
    };

    return (
        <div>
            <select id="tier-select" value={selectedTier} onChange={handleChange}>
                <option value="Lith">Lith</option>
                <option value="Meso">Meso</option>
                <option value="Neo">Neo</option>
                <option value="Axi">Axi</option>
            </select>
        </div>
    );
}