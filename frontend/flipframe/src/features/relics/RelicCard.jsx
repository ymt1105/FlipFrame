import { useNavigate } from "react-router-dom";
export const RelicCard = ({relic}) => {
    const navigate = useNavigate();
    const relicName = relic[0];
    const relicInfo = relic[1];

    const handleRelicClick = (relicName) => {
        // let concatenatedName = relicName + " relic"
        // concatenatedName = concatenatedName.toLowerCase().replaceAll(' ', '_');
        // navigate(`/item/${concatenatedName}`)
        console.log(relicName);
    }
    return (
        
        <div className = "border m-2 p-2" key={relicName}>
            <h2 className="" onClick = {() => handleRelicClick(relicName)}>{relicName}</h2>
            <p>Vaulted: {relicInfo.vaulted ? "Yes" : "No"}</p>
            <p>{relicInfo.Intact.quantity}x Intact: {relicInfo.Intact.price.toFixed(2)}</p>
            <p>{relicInfo.Exceptional.quantity}x Exceptional: {relicInfo.Exceptional.price.toFixed(2)}</p>
            <p>{relicInfo.Flawless.quantity}x Flawless: {relicInfo.Flawless.price.toFixed(2)}</p>
            <p>{relicInfo.Radiant.quantity}x Radiant: {relicInfo.Radiant.price.toFixed(2)}</p>
            <p>Difference: {relicInfo.upgradeDiff.toFixed(2)}</p>

        </div>                
    );    
}