import { useState, useEffect } from "react"
import { getLookup } from "../services/api";
import { useNavigate } from "react-router-dom";
export const AutoCompleteSearch = () => {
    const [lookupData, setLookupData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        slug: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmitOrder = (e) => {
        e.preventDefault();
        navigate(`/item/${formData.slug}`);
    };

    if (loading) {
        return <div>Loading lookup sheet...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmitOrder} className="space-y-4">
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700">Slug</span>
                    <input 
                        name="slug" 
                        value={formData.slug} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <button type="submit">
                    Yes
                </button>
            </form>
        </div>
    );
}