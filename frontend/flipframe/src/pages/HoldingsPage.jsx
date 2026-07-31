import { HoldingsCard } from "../features/holdings/HoldingsCard";
import { useHoldings } from "../context/HoldingsContext"
import { GeneralButton } from "../components/GeneralButton";

export const HoldingsPage = () => {
        const { holdings, deleteAllHoldings } = useHoldings();
        // sum up all the holdings prices and stuff
        const currentAssetValuation = "0"
        return (
                <div>
                        <GeneralButton onClickMethod={deleteAllHoldings} displayLabel={"Delete All Holdings"}/>
                        <div>Total Assets: {currentAssetValuation} Platinum</div>
                        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-6">   
                        {Object.entries(holdings).map((item) => {
                                const itemSlug = item[0];
                                const itemQuantity = item[1];
                                const longPosition = "PLACEHOLDER"
                                return (
                                        <HoldingsCard
                                                key={itemSlug}
                                                itemSlug={itemSlug}
                                                quantity={itemQuantity}
                                                longPosition={longPosition}
                                        />
                                )
                        })}   
                </div>
                </div>
        )
}