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
            const baseURL = "https://warframe.market/static/assets/"
            const itemIcon = baseURL+item.i18n.en.icon;
            const itemThumb = baseURL+item.i18n.en.thumb;
            lookupJson[itemID] = [itemName, itemSlug, [tags], itemIcon, itemThumb];
            
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
            const itemIcon = item.i18n.en.icon;
            const itemThumb = item.i18n.en.thumb;

            lookupJson[itemID] = [itemName, itemSlug, rivenType, itemIcon, itemThumb];
            
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