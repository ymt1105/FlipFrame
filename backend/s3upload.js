import 'dotenv/config';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as task from './resources/wfmtasks.js';
import { readTextFile } from './resources/readTextFile.js';
import { destructureOrders } from './resources/destructureOrders.js';
import { sleep } from './resources/sleep.js';
const s3Client = new S3Client({ region: "ap-southeast-2" });
const baseURL = "https://api.warframe.market/v2"

const test_data = await readTextFile('itemslugs.json');


async function retrieveItemOrders() {
    let orderbook = {}
    for (const [name, details] of Object.entries(test_data)) {
        const slug = details[0];
        const orders = await getItem(slug);
        const simplifiedOrders = await destructureOrders(orders);
        await sleep(400);
        orderbook = {...orderbook, simplifiedOrders};        
    }
    return orderbook
}

export async function getItem(slug){
    try {
        const modifiedURL = `${baseURL}/orders/item/${slug}`;
        const response = await fetch(modifiedURL);
        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(responseJson)}`);
        }
        return responseJson;
    } catch (err) {
        console.error("Operation failed:", err.message);    
    }
    
}

// async function uploadToAWS(name, payload) {
//     const today = new Date();

//     const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: `${name}${today}.json`,
//         Body: JSON.stringify(payload),
//         ContentType: "application/json",
//     };
    
//     try {
//         const data = await s3Client.send(new PutObjectCommand(params));
//         console.log("Upload successful", data);
//     } catch (err) {
//         console.error("Error uploading file", err);
//     }
// }

// const itemOrders = await retrieveItemOrders();


