import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        slug: ""
    });
    // const handleDetailedView = (slug) => {
    //     navigate(`/item/${slug}`)
    // };
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
    return (
        <div>
            {/* <div className="grid grid-cols-3">
                <div><SearchBar onSearch={setSearchTerm} /></div>                     
            </div> */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
                <label className="block">
                    <span className="block text-sm font-medium text-gray-700">Slug<span className="text-red-500">*</span></span>
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