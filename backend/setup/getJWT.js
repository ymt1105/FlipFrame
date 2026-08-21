import 'dotenv/config';
import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
config({ path: path.resolve(__dirname, '../.env') });

export async function getJWT(){
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

    const envPath = path.resolve(__dirname, '../.env');

    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const envKey = 'JWT';
    const regex = new RegExp(`^${envKey}=.*`, 'm');

    if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${envKey}=${token}`);
    } else {
        envContent += `\n${envKey}=${token}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');

    console.log('JWT successfully updated in .env');
}

getJWT();