import 'dotenv/config';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sleep } from './sleep.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env') });

const baseURL = "https://api.warframe.market/v2"

const jwt = process.env.JWT;
const user = process.env.USER;
const headers = {
    "Authorization": `Bearer ${jwt}`, 
    "Content-Type": "application/json" 
};

async function getAllOrders(){
    const modifiedURL = `${baseURL}/orders/user/${user}`;
    const response = await fetch(modifiedURL, headers);
    const responseJson = await response.json();        

    return responseJson;
}

async function deleteAllOrders(){
    const allUserOrders = await getAllOrders();
    console.log(allUserOrders);
    for (const order of Object.values(allUserOrders.data)){
        const orderid = order.id;
        deleteSingleOrder(orderid);
        await sleep(400);
    }    

}

async function deleteSingleOrder(orderID){
    const modifiedURL = `${baseURL}/order/${orderID}`;
    const response = await fetch(modifiedURL, 
    {
        method : 'DELETE', 
        headers : headers
    });
    const responseJson = await response.json();  

}

async function createPayload(item_id, type, buy_price, quantity){
    const payload = {
        "itemId": item_id, 
        "type": type, 
        "platinum": buy_price, 
        "quantity": quantity, 
        "visible": true
    } 
    return payload;
}

async function createEditPayload(platinum, quantity){
    const payload = {
        "platinum": platinum,
	    "quantity": quantity,
        "visible": true
    } 
    return payload;
}

async function getItemID(itemSlug){
    const modifiedURL = `${baseURL}/item/${itemSlug}`;
    const response = await fetch(modifiedURL)
    const responseJson = await response.json()
    const itemID = responseJson.data.id;
    return itemID;
}
async function getItemName(itemID){
    const modifiedURL = `${baseURL}/itemId/${itemID}`;
    const response = await fetch(modifiedURL);
    const responseJson = await response.json()
    const slug = responseJson.data.slug;
    return slug;
}
async function getOrderID(itemName){
    const allOrders = await getAllOrders();
    for (const order of Object.values(allOrders.data)){
        const curritemID = order.itemId
        const curritemName = await getItemName(curritemID);
        if (curritemName == itemName) {
            return order.id;
        }
    }

}
async function addOrder(payload){
    const modifiedURL = `${baseURL}/order`;

    const response = await fetch(modifiedURL, 
    {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json()
    console.log("Successfully added order");
    
}

async function editOrder(payload, id){
    try {
        const modifiedURL = `${baseURL}/order/${id}`;

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

        console.log("Success:", responseJson);
    } catch (err) {
        console.error("Operation failed:", err.message);    
    }
    
}




async function getJWT(){
    const email = process.env.WF_EMAIL;
    const password = process.env.WF_PASS;
    let rep = await fetch("https://api.warframe.market/v1/auth/signin", {
        method: "POST",
        headers: { 
            "Authorization": "JWT", 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    let token = rep.headers
        .get("set-cookie")
        .split(";")[0]
        .replace("JWT=", "");

    console.log(token)
    return token;
}
const test_slug = "rhino_prime_set";


// // test adding orders
// const itemID = await getItemID(test_slug);
// const payload = await createPayload(itemID, "buy", 100, 1);
// await addOrder(payload);

// // test updating orders
const orderID = await getOrderID(test_slug);
const itemID = await getItemID(test_slug);
const payload = await createEditPayload(50, 1);
await editOrder(payload, orderID);

// //test deleting all orders
// await deleteAllOrders();