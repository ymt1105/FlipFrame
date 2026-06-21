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

async function getAllOrders(user){
    const modifiedURL = `${baseURL}/orders/user/${user}`;
    

    const response = await fetch(modifiedURL);
    const responseJson = await response.json();        

    return responseJson;
}

async function deleteAllOrders(user){
    const headers = {
        "Authorization": `Bearer ${jwt}`
    }

    const allUserOrders = await getAllOrders(jwt, user);
    for (const order of Object.values(allUserOrders.data)){
        const orderid = order.id;
        const modifiedURL = `${baseURL}/order/${orderid}`
        const response = await fetch(modifiedURL, 
            {
                method : 'DELETE', 
                headers : headers
            });
        const responseJson = await response.json();        
        await sleep(400);
    }    

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
async function getItemID(itemSlug){
    const modifiedURL = `${baseURL}/item/${itemSlug}`;
    const response = await fetch(modifiedURL)
    const responseJson = await response.json()
    const itemID = responseJson.data.id;
    return itemID;
}
async function addBuyOrder(payload){
    const modifiedURL = `${baseURL}/order`;

    const response = await fetch(modifiedURL, 
    {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
    const responseJson = await response.json()
    console.log(responseJson);
    
}


async function getJWT(user){
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
// test adding orders
const itemID = await getItemID("rhino_prime_set");
const payload = await createPayload(itemID, "buy", 100, 1);
addBuyOrder(payload);
