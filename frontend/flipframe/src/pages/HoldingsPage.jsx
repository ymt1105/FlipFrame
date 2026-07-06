import { useHoldings } from "../context/HoldingsContext"

export const HoldingsPage = () => {
        const { holdings } = useHoldings();

        return (
                <h2>Holdings</h2>
        )
}