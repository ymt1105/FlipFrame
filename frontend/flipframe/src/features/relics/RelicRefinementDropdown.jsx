import { useState } from "react";
export function RelicRefinementDropdown() {
    const [selectedTier, setSelectedTier] = useState('Intact');

    const handleChange = (event) => {
        setSelectedTier(event.target.value);
        console.log("Selected tier:", event.target.value);
    };

    return (
        <div>
            <select id="tier-select" value={selectedTier} onChange={handleChange}>
                <option value="Intact">Intact</option>
                <option value="Exceptional">Exceptional</option>
                <option value="Flawless">Flawless</option>
                <option value="Radiant">Radiant</option>
            </select>
        </div>
    );
}