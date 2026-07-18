import { useState } from "react";

export const StatusSelect = ({status, setStatus}) => {
    const [activeTab, setActiveTab] = useState("all");

    const handleAll = () => {
        setStatus("all")
        setActiveTab("all")
    };

    const handleOnline = () => {
        setStatus("online")
        setActiveTab("online");
    };

    const handleIngame = () => {
        setStatus("ingame")
        setActiveTab("ingame");
    };
    const getButtonClass = (isActive) => 
        `p-2 text-white block transition-colors ${
            isActive ? "bg-green-700 font-bold" : "bg-green-500 hover:bg-green-600"
        }`;

    return (
        <div>
            <div className="grid grid-cols-3">
                <button 
                    className={getButtonClass(activeTab === "all")}
                    onClick={handleAll}
                >
                    All
                </button>
                <button 
                    className={getButtonClass(activeTab === "online")}
                    onClick={handleOnline}
                >
                    Online
                </button>
                <button 
                    className={getButtonClass(activeTab === "ingame")}
                    onClick={handleIngame}
                >
                    Ingame only
                </button>
            </div>
        </div>
    );
}