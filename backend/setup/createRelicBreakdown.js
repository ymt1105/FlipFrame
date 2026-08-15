import 'dotenv/config';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile, mkdir } from 'node:fs/promises';
//TODO: NEED TO ADD CACHING TO SPEED UP RUNNING THE FUNCTION
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../../.env') });
console.time("Setup Duration");
export const baseURL = "https://stats.alecaframe.com";

export const alecaframeToken = process.env.ALECAFRAME_TOKEN;
export const apiHeaders = {
    "accept": "application/json"
};

const allPriceData = await getItemPriceDataSheet();
export const itemPriceObject = await createItemPriceObject(allPriceData);

export const refinementChances = {
    "Intact" : {
        "Common" : 0.2533,
        "Uncommon" : 0.11,
        "Rare" : 0.02
    },
    "Exceptional" : {
        "Common" : 0.2333,
        "Uncommon" : 0.13,
        "Rare" : 0.04
    },
    "Flawless" : {
        "Common" : 0.2,
        "Uncommon" : 0.17,
        "Rare" : 0.06
    },
    "Radiant" : {
        "Common" : 0.1667,
        "Uncommon" : 0.20,
        "Rare" : 0.1
    }
};

/* 
    Get user's relic string from AlecaFrame API
*/
async function getRelicString() {
    const modifiedURL = baseURL + "/api/stats/public/getRelicInventory?publicToken=" + encodeURIComponent(alecaframeToken);
    
    const response = await fetch(modifiedURL, { headers: apiHeaders });
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); 
    return data;
}

/* 
    Convert the Base64 String into legible english
*/
async function translateRelicString(relicString){
    const binaryString = atob(relicString);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const dataView = new DataView(bytes.buffer);

    const relicTypes = { 0: 'Lith', 1: 'Meso', 2: 'Neo', 3: 'Axi', 4: 'Requiem' };
    const refinements = { 0: 'Intact', 1: 'Exceptional', 2: 'Flawless', 3: 'Radiant', 4: 'Exceptional', 5: 'Flawless', 6: 'Radiant' };

    const numRelics = dataView.getUint32(0, true);

    let offset = 4;
    const uniqueRelicsMap = new Map();
    const detailedRelicObject = {};

    for (let i = 0; i < numRelics; i++) {
        if (offset + 9 > dataView.byteLength) {
            console.warn(`[WARNING]: API string truncated. Stopped parsing at relic index ${i}.`);
            break; 
        }
        const rType = dataView.getUint8(offset);
        const rRefine = dataView.getUint8(offset + 1);
        
        let name = String.fromCharCode(
            dataView.getUint8(offset + 2),
            dataView.getUint8(offset + 3),
            dataView.getUint8(offset + 4)
        ).trim();

        const count = dataView.getUint32(offset + 5, true);

        const tier = relicTypes[rType] !== undefined ? relicTypes[rType] : `Unknown(${rType})`;
        const refinementStage = refinements[rRefine] !== undefined ? refinements[rRefine] : `Unknown(${rRefine})`;
        const relicKey = `${tier} ${name}`;

        if (uniqueRelicsMap.has(relicKey)) {
            uniqueRelicsMap.get(relicKey).count += count;
        } else {
            uniqueRelicsMap.set(relicKey, {
                tier: tier,
                name: name,
                count: count,
                fullname: relicKey
            });
        }
        detailedRelicObject[`${relicKey} ${refinementStage}`] = {
            tier: tier,
            count: count,
        };
        
        offset += 9;
    }
    
    uniqueRelicsMap.set('Requiem Eterna', {
        tier: 'Requiem',
        name: 'Eterna',
        count: 10,
        fullname: 'Requiem Eterna'
    });
    const translatedArray = Array.from(uniqueRelicsMap.values());
    return { translatedArray, detailedRelicObject };
}

/*

*/
async function getRelicContents(relicName){
    const modifiedURL = 'https://api.warframestat.us/items/search/' + encodeURIComponent(relicName);
    const response = await fetch(modifiedURL);
    const responseJson = await response.json();
    return responseJson;
}

/*
    Get the specified date in a certain formatted for
*/
async function getFormattedDate(offset){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate() - 1 - offset).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/*
    Searches for WFM historic records the JSON, it will go back a few days to ensure that it does not break due to delayed files
*/
async function getItemPriceDataSheet(){
    for (let i = 0; i < 3; i++){
        try {
            const formattedDate = await getFormattedDate(i);
            console.log(`Trying to fetch price history for: ${formattedDate}`);
            const response = await fetch(`https://relics.run/history/price_history_${formattedDate}.json`);
            const responseJson = await response.json();
            return responseJson;
        } catch(error){
            console.warn(`Failed to fetch for offset ${i}, trying previous day...`);
        }
    }
    throw new Error("Could not find any price history files from the last 3 days.");
}

/*
    Creates an object with the name of the item and the price
*/
async function createItemPriceObject(priceData){
    const itemPriceObject = {};
    Object.entries(priceData).forEach(([key, value]) => {
        if (key.includes("Prime")){
            const soldWeightedAverage = value[0].wa_price;
            itemPriceObject[key] = soldWeightedAverage;
        }
    });
    return itemPriceObject;
}

/*
    Checks Object to see the price
*/
async function lookupPrice(itemName){
    return itemPriceObject[itemName] || 0;
}

/*
    Returns how much platinum each relic is worth when opened
*/
async function calculateRelicValue(drops, refinementName){
    const unpackedItems = Object.entries(drops).flatMap(([tier, items]) => {
        return Object.entries(items).map(([itemName, price]) => {
            return { tier, itemName, price };
        });
    });
    
    const weightedPrices = unpackedItems.map((item) => {
        const chances = refinementChances[refinementName];
        const chance = chances[item.tier] || 0;
        return chance * item.price;
    });
    
    const total = weightedPrices.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);    
    return total;
}
/*
    Calculates the prices of the items inside the relic
*/
async function getRelicDropsFromRewards(relicRewards){
    const dropsPrices = {
        "Common" : {},
        "Uncommon" : {},
        "Rare" : {}
    };
    for (const stage of Object.values(relicRewards)){
        const itemName = stage.item.name;
        if (!itemName.includes("Forma")){
            const itemPrice = await lookupPrice(itemName);
            const rawChance = stage.chance;

            let tier = "Common";
            if (rawChance <= 5.0) {
                tier = "Rare";
            } else if (rawChance <= 15.0) {
                tier = "Uncommon";
            }

            dropsPrices[tier][itemName] = itemPrice;
        }
    }
    return dropsPrices;
}
/*

*/
async function getRelicDrops(relic){
    const relicName = relic.fullname;
    const relicInfo = await getRelicContents(relicName);
    if (!relicInfo || relicInfo.length === 0 || !relicInfo[0].rewards) {
        throw new Error(`Could not fetch rewards for relic: ${relicName}`);
    }
    return await getRelicDropsFromRewards(relicInfo[0].rewards);
}

/*
    Create Object with all the required data
*/
async function createRelicBreakdown(){
    const relicString = await getRelicString();
    const { translatedArray, detailedRelicObject } = await translateRelicString(relicString);
    const relicsBreakdown = {
        data: {}
    };
    
    relicsBreakdown["date_printed"] = await getFormattedDate(0);
    const refinementNames = Object.keys(refinementChances);
    const validRelics = translatedArray.filter(relic => relic.tier !== "Requiem");

    //process 15 in parallel to speed run execution
    const batchSize = 15;
    for (let i = 0; i < validRelics.length; i += batchSize) {
        const batch = validRelics.slice(i, i + batchSize);

        await Promise.all(batch.map(async (relic) => {
            const relicName = relic.fullname;
            try {
                const responseJson = await getRelicContents(relicName);
                if (!responseJson || responseJson.length === 0 || !responseJson[0].rewards) {
                    return;
                }

                relicsBreakdown["data"][relicName] = {
                    Intact: {},
                    Exceptional: {},
                    Flawless: {},
                    Radiant: {}
                };

                const drops = await getRelicDropsFromRewards(responseJson[0].rewards);

                for (const refinementName of refinementNames) {
                    const lookupKey = `${relicName} ${refinementName}`;
                    const relicPrices = await calculateRelicValue(drops, refinementName);
                    
                    const relicDetailed = detailedRelicObject[lookupKey] || {
                        tier: relic.tier,
                        count: 0
                    };    

                    relicsBreakdown["data"][relicName][refinementName] = {
                        price: relicPrices,
                        quantity: relicDetailed.count
                    };
                }
            } catch (err) {
                console.warn(`Skipping ${relicName} due to error: ${err.message}`);
            }
        }));
    }

    const vanguardRelics = ["Vanguard C1", "Vanguard E1", "Vanguard M1", "Vanguard P1"];
    for (const relicName of vanguardRelics) {
        try {
            const responseJson = await getRelicContents(relicName);
            if (!responseJson || responseJson.length === 0 || !responseJson[0].rewards) {
                console.log(`Could not find valid rewards for ${relicName}`);
                continue;
            }
            
            relicsBreakdown["data"][relicName] = relicsBreakdown["data"][relicName] || {
                Intact: {}, Exceptional: {}, Flawless: {}, Radiant: {}
            };

            const drops = await getRelicDropsFromRewards(responseJson[0].rewards);            
            for (const refinementName of refinementNames) {
                const relicValue = await calculateRelicValue(drops, refinementName);
                relicsBreakdown["data"][relicName][refinementName] = {
                    price: relicValue,
                    quantity: 999
                };    
            }
        } catch (error) {
            console.error(`Error processing ${relicName}:`, error.message);
        }
    }

    await sortAndWriteFile(relicsBreakdown);
    console.log("Successfully created lookup file");
}

//
async function sortAndWriteFile(relicsBreakdown) {
    try {
        const sortedRelics = Object.entries(relicsBreakdown.data).sort((a, b) => {
            const priceA = a[1].price; 
            const priceB = b[1].price;
            return priceB - priceA;
        });

        const sortedObject = {
            data: Object.fromEntries(sortedRelics)
        };
        const filePath = path.join(__dirname, '..', 'jsons', 'relicPriceSortedLookup.json');        

        const dirPath = path.dirname(filePath);
        await mkdir(dirPath, { recursive: true });
        await writeFile(filePath, JSON.stringify(sortedRelics, null, 2), 'utf8');
        console.log("Saved sorted list to relics_sorted.json");
    } catch (error) {
        console.error("Error reading or processing the JSON file:", error);
    }
}

await createRelicBreakdown();
console.timeEnd("Setup Duration");
