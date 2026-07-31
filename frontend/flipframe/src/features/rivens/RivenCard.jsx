export const RivenCard = ({rivenData}) => {
    const rivenDetails = {
        weapon_name : rivenData.item.weapon_url_name || "Unknown",
        prefix : rivenData.item.name|| "Unknown",
        attributes : rivenData.item.attributes || "Unknown",
        price : rivenData.starting_price || "Unknown",
        topbid : rivenData.top_bid || rivenData.starting_price,
        buyoutPrice : rivenData.buyout_price || null,
        username : rivenData.owner.ingame_name || "You",
        status : rivenData.owner.status || "ingame",
        rank: rivenData.item.mod_rank || 0,
        polarity: rivenData.item.polarity || "Unknown",
        reroll: rivenData.item.re_rolls || 0
    }
    rivenDetails.weapon_name = String(rivenDetails.weapon_name).charAt(0).toUpperCase() + String(rivenDetails.weapon_name).slice(1);
    let counter = 0
    return(
        <div className="bg-white p-4 border rounded shadow-md flex flex-col h-full">
            <h2 className="center">{rivenDetails.weapon_name} {rivenDetails.prefix}</h2>
            <div className = "grid grid-cols-2">
                <div>
                    <ul className="display-flex">
                        {rivenDetails.attributes.map(attribute => {
                            const concatenatedAttribute = `${attribute.value}  ${attribute.url_name}`;
                            counter += 1;
                            return (
                                <li key = {counter}>{concatenatedAttribute}</li>
                            )
                            
                        })}
                    </ul>
                    <p>Rank: {rivenDetails.rank}</p>
                    <p>Polarity: {rivenDetails.polarity}</p>
                    <p>Rerolls: {rivenDetails.reroll}</p>
                </div>
                <div>
                    <p>Price: {rivenDetails.price}</p>
                    <p>Top Bid: {rivenDetails.topbid}</p>
                    <p>Buyout Price: {rivenDetails.buyoutPrice}</p>
                    <p>Seller: {rivenDetails.username}</p>
                    <p className="font-semibold text-gray-700">
                        Status:{" "}
                        <span 
                            className={
                            rivenDetails.status === "ingame"
                                ? "text-purple-500 font-bold" 
                                : rivenDetails.status === "online"
                                ? "text-green-500 font-bold"
                                : "text-gray-400"
                            }
                        >
                            {rivenDetails.status}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}