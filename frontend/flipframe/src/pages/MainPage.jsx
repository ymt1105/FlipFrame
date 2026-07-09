import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { AutoCompleteSearch} from "../components/AutoCompleteSearch"
export const MainPage = () => {
    return (
        <div className="px-6 py-6">
            <AutoCompleteSearch/>
        </div>
    );
}