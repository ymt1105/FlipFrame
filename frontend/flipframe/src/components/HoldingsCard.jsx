export const HoldingsCard = ({itemSlug, quantity, longPosition}) => {
    
    return (
        <div className="bg-white p-4 border rounded shadow-md flex flex-col h-full">
            <h2>{itemSlug}</h2>
            <p>Quantity: {quantity}</p>
            <p>Long Position: {longPosition}</p>
        </div>
    )
}