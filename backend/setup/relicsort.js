import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function sortAndDisplayRelics() {
    try {
        const rawData = fs.readFileSync('../resources/relicPriceLookup.json', 'utf8');
        const relicsBreakdown = JSON.parse(rawData);

        const sortedRelics = Object.entries(relicsBreakdown.data).sort((a, b) => {
            const priceA = a[1].price; 
            const priceB = b[1].price;
            return priceB - priceA;
        });

        console.log("=== RELICS SORTED BY VALUE (HIGHEST TO LOWEST) ===\n");
        
        sortedRelics.forEach(([relicName, dataObj], index) => {
            console.log(`${index + 1}. ${relicName}: ${dataObj.price.toFixed(2)}p (Qty: ${dataObj.quantity})`);
        });

        const sortedObject = {
            data: Object.fromEntries(sortedRelics)
        };
        const filePath = path.join(__dirname, '..', 'resources', 'relicPriceSortedLookup.json');        
        await writeFile(filePath, JSON.stringify(relicsBreakdown, null, 2), 'utf8');
        console.log("Saved sorted list to relics_sorted.json");
    } catch (error) {
        console.error("Error reading or processing the JSON file:", error);
    }
}

sortAndDisplayRelics();