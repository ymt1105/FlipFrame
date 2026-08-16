import { writeFile, mkdir } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export async function writeOutJSONFile(object, __dirname){
    try {
        const filePath = path.join(__dirname, '..', 'jsons', 'relicPriceLookup.json');        

        const dirPath = path.dirname(filePath);
        
        await mkdir(dirPath, { recursive: true });
        await writeFile(filePath, JSON.stringify(object, null, 2), 'utf8');
        console.log("Saved sorted list to relicPriceLookup.json");
    } catch (error) {
        console.error("Error reading or processing the JSON file:", error);
    }
}