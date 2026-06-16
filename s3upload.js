import 'dotenv/config';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { retrieveWFM } from './resources/retrieveWFM.js';
import { readTextFile } from './resources/readTextFile.js';
import { destructureOrders } from './resources/destructureOrders.js';

const s3Client = new S3Client({ region: "ap-southeast-2" });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const test_data = await readTextFile('itemslugs.json');

async function retrieveItemOrders() {
    for (const [name, details] of Object.entries(test_data)) {
        const slug = details[0];
        const orders = await retrieveWFM(slug);
        const simplifiedOrders = await destructureOrders(orders);
        uploadToAWS(name, simplifiedOrders);
        await sleep(1000);
    }
}

async function uploadToAWS(name, payload) {
    const today = new Date();

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${name}${today}.json`,
        Body: JSON.stringify(payload),
        ContentType: "application/json",
    };
    
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("Upload successful", data);
    } catch (err) {
        console.error("Error uploading file", err);
    }
}
retrieveItemOrders();



