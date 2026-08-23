import itemLookup from '../jsons/itemLookup.json' with { type: 'json' };

export async function matchLookup(itemIDsArray) {
    if (!Array.isArray(itemIDsArray)) {
        console.error("Please provide an array of IDs");
        return [];
    }

    const enrichedItems = itemIDsArray.map(id => {
        return {
            id: id,
            name: itemLookup[id][0]|| "Unknown Item",
            slug: itemLookup[id][1]|| "Unknown Slug",
            icon: itemLookup[id][2]|| "Unknown Icon",
            image: itemLookup[id][3]|| "Unknown Image"
        };
    }); 

    return enrichedItems;
}