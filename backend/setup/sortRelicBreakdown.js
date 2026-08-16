import path from 'path';
import relicLookup from '../jsons/relicPriceLookup.json' with { type: 'json' };
import { writeOutJSONFile } from './writeOutJSONFile.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const relicData = relicLookup.data;
/*
    Sorted the relic list by the most valuable radiant relic
*/
function sortByMVRadiantRelic(){
    const sortedRelicLookup = Object.entries(relicData).sort((a, b) => {
        const radiantA = a[1].Radiant.price;
        const radiantB = b[1].Radiant.price;
        return radiantB - radiantA;
    });
    return sortedRelicLookup;
}

/*
    Determines which relics have the highest difference between their intact form compared to their radiant form
*/
function calculateUpgradeDifference(){
    let relicDiffObj = relicData;
    for (const obj of Object.entries(relicDiffObj)){
        const relicName = obj[0];
        const relicArray = obj[1];
        const difference = relicArray.Radiant.price - relicArray.Intact.price;
        relicDiffObj[relicName].upgrade_diff = difference;
    }
    const sortedRelicLookup = Object.entries(relicDiffObj).sort((a, b) => {
        const diffA = a[1].upgrade_diff;
        const diffB = b[1].upgrade_diff;
        return diffB - diffA;
    });
    return sortedRelicLookup
}

// const sorted = await sortByMVRadiantRelic();
const value = await calculateUpgradeDifference();
console.log(value.slice(0,10));