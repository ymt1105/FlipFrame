import { writeFile, mkdir } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export async function writeOutJSONFile(object, __dirname, fileName){
    try {
        const filePath = path.join(__dirname, '..', 'jsons', fileName);        

        const dirPath = path.dirname(filePath);
        
        await mkdir(dirPath, { recursive: true });
        await writeFile(filePath, JSON.stringify(object, null, 2), 'utf8');
        console.log(`Saved the breakdown file as ${fileName}`);
    } catch (error) {
        console.error('Error reading or processing the JSON file:', error);
    }
}