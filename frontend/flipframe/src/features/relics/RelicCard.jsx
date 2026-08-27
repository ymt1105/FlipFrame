import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const RelicCard = ({relic}) => {
    const navigate = useNavigate();
    const relicName = relic[0];
    const relicInfo = relic[1];
    const relicType = relicInfo.relicType;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleRelicClick = (relicName) => {
        setIsModalOpen(true);
    }
    const onClose = (e) =>{
        setIsModalOpen(false);
    }
    const commonDropsArray = Object.entries(relicInfo.drops.Common);
    const uncommonDropsArray = Object.entries(relicInfo.drops.Uncommon);
    const rareDropsArray = Object.entries(relicInfo.drops.Rare);
    return (
        
        <div className = {`border m-2 p-2 ${
            relicType === "Axi" ? "bg-yellow-200" : 
            relicType === "Neo" ? "bg-slate-300" :
            relicType === "Meso" ? "bg-zinc-600" :
            "bg-amber-800"}`}
            key={relicName}>
            <div onClick = {() => handleRelicClick(relicName)}>
                <h2 className="">{relicName}</h2>
                <p>Vaulted: {relicInfo.vaulted ? "Yes" : "No"}</p>
                <p>{relicInfo.Intact.quantity}x Intact: {relicInfo.Intact.price.toFixed(2)}</p>
                <p>{relicInfo.Exceptional.quantity}x Exceptional: {relicInfo.Exceptional.price.toFixed(2)}</p>
                <p>{relicInfo.Flawless.quantity}x Flawless: {relicInfo.Flawless.price.toFixed(2)}</p>
                <p>{relicInfo.Radiant.quantity}x Radiant: {relicInfo.Radiant.price.toFixed(2)}</p>
                <p>Difference: {relicInfo.upgradeDiff.toFixed(2)}</p>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all">
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                            <h2>{relicName}</h2>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 font-semibold"
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            <ul>
                                {commonDropsArray.map(common => {
                                    return (<li>
                                        <p>🥉{common[0]}: {common[1].toFixed(2)}p</p>
                                    </li>);
                                })}
                                {uncommonDropsArray.map(uncommon => {
                                    return (<li>
                                        <p>🥈{uncommon[0]}: {uncommon[1].toFixed(2)}p</p>
                                    </li>);
                                })}
                                {rareDropsArray.map(rare => {
                                    return (<li>
                                        <p>🥇{rare[0]}: {rare[1].toFixed(2)}p</p>
                                    </li>);
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>                
    );    
}