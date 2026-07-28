import { useHoldings } from "../../context/HoldingsContext"
export const DeleteAllHoldingsButton = () => {
    const {deleteAllHoldings} = useHoldings();
    return (
        <div>
            <button onClick = {deleteAllHoldings}>Delete All Holdings</button>
        </div>
    )
}