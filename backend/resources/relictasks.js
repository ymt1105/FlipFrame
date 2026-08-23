
import myrelicLookup from '../jsons/relicPriceLookup.json' with {type: 'json'};
import sortedRelicLookup from '../jsons/sortedByValueRelic.json' with {type: 'json'};
import bestRelicsToUpgrade from '../jsons/bestToUpgradeRelics.json' with {type: 'json'};
import allRelicsLookup from '../jsons/allRelicPriceLookup.json' with {type: 'json'};

// return best x relics to upgrade, where the difference between radiant and intact is the smallest
export async function getBestRelicsToUpgrade(){
    const data = bestRelicsToUpgrade.data;
    let counter = 0
    const returnedAmount = 15;
    for (const order of Object.entries(data)){
        if (counter >= returnedAmount){
            break;
        }
        console.log(order)
        counter++
    }
    return data;
}

export async function getMostValuableRelics(){
    const data = sortedRelicLookup.data;
    let counter = 0
    const returnedAmount = 15;
    const returnedObject = {};

    for (const order of Object.entries(data)){
        if (counter >= returnedAmount){
            break;
        }
        returnedObject = {...returnedObject, order};
        counter++
    }
    return returnedObject;
}

export async function getRelicInfo(relicsArray){
    for(const relicName of relicsArray){
        try {
            console.log(allRelicsLookup.data[relicName]);

        } catch (error) {
            console.error(error)
        }
    }
}
// await getBestRelicsToUpgrade();
// console.log("Hi")
// await getMostValuableRelics();
const testArray = ["Neo S7", "Axi C9"]
const testSIngle = ["Bruh"];
await getRelicInfo(testArray);
await getRelicInfo(testSIngle);