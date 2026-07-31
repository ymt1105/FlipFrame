import 'dotenv/config';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sleep } from './sleep.js';
import { writeFile } from 'node:fs/promises';
import itemLookup from './itemlookup.json' with { type: 'json' };
import { matchLookup } from './matchLookup.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../../.env') });

export const baseURL = "https://api.warframe.market/v2"

export const jwt = process.env.JWT;
export const user = process.env.USER;
export const headers = {
    "Authorization": `Bearer ${jwt}`, 
    "Content-Type": "application/json",
    'User-Agent': 'FlipFrame (github: ymt1105)'
};

export async function getAllCurrentUserOrders(){
    const modifiedURL = `${baseURL}/orders/user/${user}`;
    const response = await fetch(modifiedURL, headers);
    const responseJson = await response.json();        

    return responseJson;
}

export async function deleteAllCurrentUserOrders(){
    const allUserOrders = await getAllCurrentOrders();
    console.log(allUserOrders);
    for (const order of Object.values(allUserOrders.data)){
        const orderid = order.id;
        deleteSingleOrder(orderid);
        await sleep(300);
    }    

}

export async function deleteSingleOrder(orderID){
    const modifiedURL = `${baseURL}/order/${orderID}`;
    const response = await fetch(modifiedURL, 
    {
        method : 'DELETE', 
        headers : headers
    });
    const responseJson = await response.json();  

}

export async function createPayload({ itemId, type, platinum, quantity, visible = true, ...optionalFields}) {
    if (!itemId || !type || platinum === undefined || quantity === undefined) {
        throw new Error("Missing required fields: itemId, type, platinum, and quantity are required.");
    }

    const payload = {
        itemId,
        type,
        platinum,
        quantity,
        visible,
        ...optionalFields 
    };

    return payload;
}

export async function createEditPayload(platinum, quantity, visible = true, ...optionalFields){
    if (platinum === undefined || quantity === undefined) {
        throw new Error("Missing required fields: platinum, and quantity are required.");
    }

    const payload = {
        platinum,
        quantity,
        visible,
        ...optionalFields 
    };

    return payload;
}

export async function getItemID(itemSlug){
    if (!itemSlug) return null;

    const foundEntry = Object.entries(itemLookup).find(([id, itemData]) => {
        const slug = itemData[1];
        return slug === itemSlug.toLowerCase().trim();
    });

    if (foundEntry) {
        const [id, [name, slug]] = foundEntry;
        return id;
    }
    return null;
}
export async function getItemName(itemID){
    const modifiedURL = `${baseURL}/itemId/${itemID}`;
    const response = await fetch(modifiedURL);
    const responseJson = await response.json()
    const slug = responseJson.data.slug;
    return slug;
}

export async function getOrderID(itemName){
    const allOrders = await getAllCurrentOrders();
    for (const order of Object.values(allOrders.data)){
        const curritemID = order.itemId
        const curritemName = await getItemName(curritemID);
        if (curritemName == itemName) {
            return order.id;
        }
    }

}

export async function createNewOrder(payload){
    try{
        const modifiedURL = `${baseURL}/order`;

        const response = await fetch(modifiedURL, 
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        const responseJson = await response.json()    
        if (!response.ok) {
            console.error(`API Error (${response.status}):`, responseJson);
            throw new Error(responseJson.error || `Server responded with status ${response.status}`);
        }
        return responseJson;
    } catch(err){
        console.error("Operation failed:", err.message);    
    }
}

export async function editOrder(payload, orderid){
    try {
        const modifiedURL = `${baseURL}/order/${orderid}`;

        const response = await fetch(modifiedURL, 
        {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(payload)
        });
        const responseJson = await response.json()
        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(responseJson)}`);
        }

        return responseJson;
    } catch (err) {
        console.error("Operation failed:", err.message);    
        return err;
    }
    
}

export async function getItemData(slug){
    try {
        const modifiedURL = `${baseURL}/item/${slug}`;
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

export async function bumpAllCurrOrders(){
    try {
        const allOrders = await getAllCurrentUserOrders();
        console.log(allOrders);
        for (const order of Object.values(allOrders.data)){
            const payload = await createEditPayload(order.platinum, order.quantity);
            await editOrder(payload, order.id);
            await sleep(300);
        }
        return "All your orders have been bumped";
    } catch (err) {
        console.error("Failed to bump")
    }
}

export async function getTopOrdersOnRank(item_slug, rank){
    try {
        const response = await fetch(
            `https://api.warframe.market/v2/orders/item/${item_slug}/top/?rank=${rank}`);
        const responseJson = await response.json();
        if (!response.ok) {
            throw new Error(`API Error: ${JSON.stringify(responseJson)}`);
        }
        return responseJson
    } catch (err){
        console.error("Operation failed:", err.message);    
    }
}

export async function getLookUpSheet(){
    try{
        return itemLookup;
    }catch(err){
        console.error("No Lookup File")
    }

}