import { useState, useEffect } from "react";
import { getRivenLookup } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const RivenAutoCompleteSearch = () => {
    const [lookupData, setLookupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = Lookup.json(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [formData, setFormData] = useState({
        input: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLookup = async () => {
            try {
                const lookup = await getRivenLookup();
                setLookupData(lookup);
            } catch (error) {
                console.error("Failed to load lookup data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLookup();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (value.trim().length > 0 && lookupData) {
            const allItems = Object.values(lookupData);
            const filteredMatches = allItems.filter(([itemName]) => {
                return itemName.toLowerCase().includes(value.toLowerCase());
            });
            
            setSuggestions(filteredMatches.slice(0, 8));
            setShowDropdown(true);
            setFocusedIndex(-1);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
            setFocusedIndex(-1);
        }
    };

    const handleSelectSuggestion = (itemName) => {
        setFormData({ input: itemName });
        setSuggestions([]);
        setShowDropdown(false);
        setFocusedIndex(-1);

        if (lookupData) {
            const allItems = Object.values(lookupData);
            const targetItem = allItems.find(([name]) => name === itemName);
            
            if (targetItem) {
                navigate(`/riven/contracts/${targetItem[1]}`);
            } else {
                console.log("No items matched that search phrase.");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
                handleSelectSuggestion(suggestions[focusedIndex][0]);
            }
        } else if (e.key === "Escape") {
            setShowDropdown(false);
            setFocusedIndex(-1);
        }
    };

    if (loading) {
        return <div>Loading lookup sheet...</div>;
    }

    return (
        <div className="relative">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700">Weapon Riven Search</span>
                    <input 
                        name="input" 
                        value={formData.input} 
                        placeholder="Search Weapon Name"
                        onChange={handleChange} 
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-green-500 focus:ring-green-500"
                    />
                </label>

                {showDropdown && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto list-none p-0 left-0">
                        {suggestions.map(([itemName, itemSlug], index) => (
                            <li
                                key={itemSlug}
                                onClick={() => handleSelectSuggestion(itemName)}
                                className={`px-4 py-2 cursor-pointer text-gray-700 text-sm border-b border-gray-100 last:border-0 ${
                                    index === focusedIndex ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                                }`}
                            >
                                {itemName}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
}