import { useQuery } from "@tanstack/react-query"
import { getAllRelics } from "../services/api"
export const RelicsPage = () => {
    const {data: relics, isLoading} = useQuery({
        queryKey: ["relics"],
        queryFn: getAllRelics
    })
    if (isLoading) return <div>Loading...</div>;
    return (
        <div>
            <h2>SearchBar</h2>
            <div className="grid grid-cols-5">
                <p>Relic Type</p>
                <p>Refinement Tier</p>
                {/* Less than or greater than filter */}
                <p>Platinum Filter</p>
                <p>Sorting by Price</p>
                <p>Vaulted?</p>
            </div>
            <div className="grid grid-cols-5">
                {Object.entries(relics?.data).map(relic => {
                    const relicName = relic[0];
                    const relicInfo = relic[1];
                    console.log(relicInfo);
                    return (
                        <div>
                            <h2 className="text-lg font-bold mb-2">{relicName}</h2>
                            <p>Vaulted: {relicInfo.vaulted ? "Yes" : "No"}</p>
                            <p>{relicInfo.Intact.quantity}x Intact: {relicInfo.Intact.price.toFixed(2)}</p>
                            <p>{relicInfo.Exceptional.quantity}x Exceptional: {relicInfo.Exceptional.price.toFixed(2)}</p>
                            <p>{relicInfo.Flawless.quantity}x Flawless: {relicInfo.Flawless.price.toFixed(2)}</p>
                            <p>{relicInfo.Radiant.quantity}x Radiant: {relicInfo.Radiant.price.toFixed(2)}</p>

                        </div>                
                    );
                })}
            </div>
            <p>Relic Placeholders</p>
        </div>
    )
}