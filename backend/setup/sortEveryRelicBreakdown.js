import path from 'path';
import relicLookup from '../jsons/allRelicPriceLookup.json' with { type: 'json' };
import { writeOutJSONFile } from '../helper/writeOutJSONFile.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const relicData = relicLookup.data;
/*
    Sorted the relic list by the most valuable radiant relic
*/
function sortByMVRadiantRelic(relicBreakdown){
    const sortedRelicLookup = Object.entries(relicBreakdown).sort((a, b) => {
        const radiantA = a[1].Radiant.price;
        const radiantB = b[1].Radiant.price;
        return radiantB - radiantA;
    });
    return sortedRelicLookup;
}

/*
    Determines which relics have the highest difference between their intact form compared to their radiant form
*/
function calculateUpgradeDifference(relicBreakdown){
    for (const obj of Object.entries(relicBreakdown)){
        const relicName = obj[0];
        const relicArray = obj[1];
        const difference = relicArray.Radiant.price - relicArray.Intact.price;
        relicBreakdown[relicName].upgrade_diff = difference;
    }
    const sortedRelicLookup = Object.entries(relicBreakdown).sort((a, b) => {
        const diffA = a[1].upgrade_diff;
        const diffB = b[1].upgrade_diff;
        return diffB - diffA;
    });
    return sortedRelicLookup
}

const mostValuableRelic = await sortByMVRadiantRelic(relicData);
const MVRObject = Object.fromEntries(mostValuableRelic);
writeOutJSONFile(MVRObject, __dirname, 'sortedByValueRelic.json');

const value = await calculateUpgradeDifference(relicData);
const valueObject = Object.fromEntries(value);
writeOutJSONFile(valueObject, __dirname, 'bestToUpgradeRelics.json');
