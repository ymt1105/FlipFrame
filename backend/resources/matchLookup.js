import itemLookup from './itemlookup.json' with { type: 'json' };

export async function matchLookup(itemIDsArray) {
    if (!Array.isArray(itemIDsArray)) {
        console.error("Please provide an array of IDs");
        return [];
    }

    const enrichedItems = itemIDsArray.map(id => {
        return {
            id: id,
            name: itemLookup[id] || "Unknown Item"
        };
    }); 

    return enrichedItems;
}