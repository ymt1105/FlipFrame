import 'dotenv/config';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sleep } from '../helper/sleep.js';
import { writeFile } from 'node:fs/promises';
import { stat } from 'node:fs';
import rivenLookup from '../jsons/rivenlookup.json' with { type: 'json' };



const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '../.env') });

export const baseURL = "https://api.warframe.market/v1"

export const jwt = process.env.JWT;
export const user = process.env.USER;
export const headers = {
    "Authorization": `Bearer ${jwt}`, 
    "Content-Type": "application/json" 
};

export async function getItemContractOrders(item_slug) {
    try {
        const modifiedURL = `${baseURL}/auctions/search?type=riven&sort_by=price_asc&weapon_url_name=${item_slug}`;
        
        const [maduraiRes, vazarinRes, naramonRes] = await Promise.all([
            fetch(modifiedURL + "&polarity=madurai", headers),
            fetch(modifiedURL + "&polarity=vazarin", headers),
            fetch(modifiedURL + "&polarity=naramon", headers)
        ]);

        const maduraiJson = await maduraiRes.json();
        const vazarinJson = await vazarinRes.json();
        const naramonJson = await naramonRes.json();

        const maduraiAuctions = maduraiJson?.payload?.auctions || [];
        const vazarinAuctions = vazarinJson?.payload?.auctions || [];
        const naramonAuctions = naramonJson?.payload?.auctions || [];

        const combinedAuctions = [
            ...maduraiAuctions,
            ...vazarinAuctions,
            ...naramonAuctions
        ].sort((a, b) => a.starting_price - b.starting_price);;

        

        return {
            payload: {
                auctions: combinedAuctions
            }
        };
    } catch (error){
        console.log(error);
        return error;
    }
}

async function processItemContractOrders(orderJson){
    const auctionsArray = orderJson?.payload?.auctions
    const rivens = auctionsArray.map(auction => {
        const seller = auction.owner?.ingame_name || "Unknown Trader";
        const status = auction.owner?.status || "offline";
        
        const rivenName = auction.item?.name || "Riven Mod";
        const price = auction.buyout_price || auction.starting_price || 0;
        const rolls = auction.item?.recycles ?? 0;
        const polarity = auction.item?.polarity || "none";
        
        const attributesArray = auction.item?.attributes || [];
        const stats = auction.item?.attributes || [];
        return {
            id: auction.id,
            rivenName,
            seller,
            status,
            price,
            rolls,
            polarity,
            stats
        };
    })
    return rivens
}

async function gradeStatCombination(statArray, statWeightTable = 0){
    //add a lookup table for each independent weapon
    const statWeights = {
        "multishot": 1.5,
        "critical_chance": 1.5,
        "critical_damage": 2,
        "base_damage_/_melee_damage": 1,
        "fire_rate_/_attack_speed": 1,
        "toxin_damage": 1
    };


    const scores = data.map(order => {
        const statArray = order.stats;
        const hasBadNegative = statArray.some(stat => stat.url_name in statWeights && !stat.positive);
        if (hasBadNegative) {
            return 0;
        }

        const totalWeight = statArray.reduce((sum, stat) => {
            const weight = statWeights[stat.url_name] || 0;
            return sum + weight, stat;
        }, 0);

        return totalWeight
    });
    return scores;

}
export async function getRivenLookUpSheet(){
    try{
        return rivenLookup;
    }catch(err){
        console.error("No Lookup File")
    }

}

export async function getAllContracts(){
    const modifiedURL = `${baseURL}/profile/${user}/auctions`
    const response = await fetch(modifiedURL, headers);
    const responseJson = await response.json();        

    return responseJson;   
}