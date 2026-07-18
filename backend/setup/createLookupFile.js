import { fileURLToPath } from 'url';
import path from 'path';
import { writeFile } from 'node:fs/promises';


async function createLookupFile(){
    try {
        const modifiedURL = `https://api.warframe.market/v2/items`;

        const response = await fetch(modifiedURL);
        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(responseJson)}`);
        }
        const lookupJson = {};
        for (const item of Object.values(responseJson.data)){
            const itemName = item.i18n.en.name;
            const itemID = item.id
            const itemSlug = item.slug;
            const tags = item.tags
            lookupJson[itemID] = [itemName, itemSlug, [tags]];
            
        }
        const jsonString = JSON.stringify(lookupJson, null, 2);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.join(__dirname, '..', 'resources', 'itemlookup.json');        console.log(filePath);
        await writeFile(filePath, jsonString , 'utf8');
        console.log("Successfully created lookup file");
    } catch (err) {
        console.error("Operation failed:", err.message);    
    }
}

async function createWeaponLookupFile(){
    try {
        const modifiedURL = `https://api.warframe.market/v2/riven/weapons`;

        const response = await fetch(modifiedURL);
        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(responseJson)}`);
        }
        console.log(responseJson)
        const lookupJson = {};
        for (const item of Object.values(responseJson.data)){
            const itemName = item.i18n.en.name;
            const itemID = item.id
            const itemSlug = item.slug;
            const rivenType = item.rivenType
            lookupJson[itemID] = [itemName, itemSlug, rivenType];
            
        }
        const jsonString = JSON.stringify(lookupJson, null, 2);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.join(__dirname, '..', 'resources', 'rivenlookup.json');        
        await writeFile(filePath, jsonString , 'utf8');
        console.log("Successfully created lookup file");

    } catch (err) {
        console.error("Operation failed:", err.message);    
    }
}
createLookupFile();
createWeaponLookupFile();