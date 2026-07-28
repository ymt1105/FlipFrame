import { useState } from "react";

export const RankSelect = ({rank, setRank, maxRank}) => {
    const [activeTab, setActiveTab] = useState("min");

    const handleMin = () => {
        setRank(0)
        setActiveTab("min")
    };

    const handleMaxed = () => {
        setRank(maxRank)
        setActiveTab("max");
    };
    const getButtonClass = (isActive) => 
        `p-2 text-white block transition-colors ${
            isActive ? "bg-green-700 font-bold" : "bg-green-500 hover:bg-green-600"
        }`;

    return (
        <div>
            <div className="grid grid-cols-2">
                <button 
                    className={getButtonClass(activeTab === "min")}
                    onClick={handleMin}
                >
                    Min
                </button>
                <button 
                    className={getButtonClass(activeTab === "max")}
                    onClick={handleMaxed}
                >
                    Max
                </button>
            </div>
        </div>
    );
}