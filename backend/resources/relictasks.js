let myRelicLookup = {};
let sortedRelicLookup = {};
let bestRelicsToUpgrade = {};
let allRelicsLookup = {};

try {
    // Dynamic imports return a Promise and support error handling
    myRelicLookup = (await import('../jsons/relicPriceLookup.json', { with: { type: 'json' } })).default;
} catch {
    console.warn("relicPriceLookup.json not found. Using default empty object.");
}

try {
    sortedRelicLookup = (await import('../jsons/sortedByValueRelic.json', { with: { type: 'json' } })).default;
} catch {
    console.warn("sortedByValueRelic.json not found.");
}

try {
    bestRelicsToUpgrade = (await import('../jsons/bestToUpgradeRelics.json', { with: { type: 'json' } })).default;
} catch {
    console.warn("bestToUpgradeRelics.json not found.");
}

try {
    allRelicsLookup = (await import('../jsons/allRelicPriceLookup.json', { with: { type: 'json' } })).default;
} catch {
    console.warn("allRelicPriceLookup.json not found.");
}

export async function getAllMyRelics(){
    const data = myRelicLookup;
    return data;
}

// return best x relics to upgrade, where the difference between radiant and intact is the smallest
export async function getBestRelicsToUpgrade(){
    const data = bestRelicsToUpgrade.data;
    let counter = 0
    const returnedAmount = 15;
    const returnedObject = {data : {}};
    for (const order of Object.entries(data)){
        if (counter >= returnedAmount){
            break;
        }
        returnedObject["data"][order[0]] = order[1];
        counter++
    }
    return returnedObject;
}

export async function getMostValuableRelics(){
    const data = sortedRelicLookup.data;
    let counter = 0
    const returnedAmount = 15;
    const returnedObject = {data : {}};

    for (const order of Object.entries(data)){
        if (counter >= returnedAmount){
            break;
        }
        returnedObject["data"][order[0]] = order[1];
        counter++
    }
    return returnedObject;
}

export async function getRelicInfo(relicName){
    return allRelicsLookup.data[relicName];
}