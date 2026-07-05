import { useState, useEffect } from "react"
import { getLookup } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AutoCompleteSearch = () => {
    const [lookupData, setLookupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [formData, setFormData] = useState({
        input: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLookup = async () => {
            try {
                const lookup = await getLookup();
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
            const filteredMatches = allItems.filter(([itemName, itemSlug]) => {
                return itemName.toLowerCase().includes(value.toLowerCase());
            });
            
            setSuggestions(filteredMatches.slice(0, 8));
            setShowDropdown(true);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    const handleSelectSuggestion = (itemName) => {
        setFormData({ input: itemName });
        setSuggestions([]);
        setShowDropdown(false);

        if (!formData.input.includes('_') && lookupData) {
            const allItems = Object.values(lookupData);
            const filteredMatches = allItems.filter(([itemName, itemSlug]) => {
                return itemName.toLowerCase().includes(formData.input.toLowerCase());
            });
            if (filteredMatches.length > 0) {
                const convertedSlug = filteredMatches.find(item => item[0] === itemName);
                navigate(`/item/${convertedSlug[1]}`)
            } else {
                console.log("No items matched that search phrase.");
            }
        }
    };

    if (loading) {
        return <div>Loading lookup sheet...</div>;
    }

    return (
        <div>
            <form>
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700">Item Search</span>
                    <input 
                        name="input" 
                        value={formData.input} 
                        onChange={handleChange} 
                        autoComplete="off"
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-green-500 focus:ring-green-500"
                    />
                </label>

                {showDropdown && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto list-none p-0 left-0">
                        {suggestions.map(([itemName, itemSlug]) => (
                            <p
                                key={itemSlug}
                                onClick={() => handleSelectSuggestion(itemName)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm border-b border-gray-100 last:border-0"
                            >
                                {itemName}
                            </p>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
}