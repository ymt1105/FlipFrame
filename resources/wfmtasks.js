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


async function deleteAllOrders(jwt, user){
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

// async function getUserID(jwt, user){
    // const headers = `{"Authorization": f"Bearer ${jwt}", "Language": "en", "Platform": "pc"}`
//     const modifiedURL = `${baseURL}/user/${user}`;


//     const response = await fetch(modifiedURL);
//     const responseJson = await response.json();        

//     console.log(responseJson);
//     const userSlugs = responseJson.slug
// }

async function getAllOrders(jwt, user){
    const modifiedURL = `${baseURL}/orders/user/${user}`;


    const response = await fetch(modifiedURL);
    const responseJson = await response.json();        

    return responseJson;
}

async function getJWT(user){
    const email = "bruh";
    const password = "bruh";
    let rep = await fetch("https://api.warframe.market/v1/auth/signin", {
        method: "POST",
        headers: { 
            "Authorization": "JWT", 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            email: email,
            password: email
        })
    });

    let token = rep.headers
        .get("set-cookie")
        .split(";")[0]
        .replace("JWT=", "");

    console.log(token)
}
deleteAllOrders(jwt, user);
// getJWT(user);