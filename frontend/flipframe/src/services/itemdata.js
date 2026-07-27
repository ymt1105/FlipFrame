import { getItemOrders, getOrdersOnItemRank } from "./api";

export async function getItemData (slug, rank = 0){
    const itemResponse = await getItemOrders(slug);
    const info = itemResponse?.data;
    let response = ""
    let maxRank = 0;
    if (info.tags.includes("arcane_enhancement") || info.tags.includes("mod")){
        maxRank = info.maxRank;
        response = await getRankItemInfo(slug, info, rank, maxRank);        
        return {info, response};
    } else if (info.tags.includes("warframe")){
        response = await getPrimePartInfo(slug, info);
        return {info, response};
    } else {
        response = await getPrimePartInfo(slug, info);
        return {info, response}
    }
}


async function getPrimePartInfo(slug, info){

    const priceData = await getOrdersOnItemRank(slug, 0);
    const topPrices = priceData?.data;
    
    const currSellPrice = topPrices?.sell[0]?.platinum;
    //TODO: still need to analyse the prices to figure out if this is correct buy price
    const currBuyPrice = topPrices?.buy[0]?.platinum;
    //TODO: look at 2d graph to figure out the actual price
    const projectedRealPrice = "PLACEHOLDER";
    const image = `https://warframe.market/static/assets/${info.i18n.en.thumb}`;
    const name = info.i18n.en.name;
    return {
        currSellPrice: currSellPrice,
        currBuyPrice: currBuyPrice, 
        projectedRealPrice: projectedRealPrice, 
        topPrices: topPrices, 
        itemName: name, 
        imageURL: image
    }
}


async function getRankItemInfo(slug, info, rank, maxRank){
    //only return orders where rank = max rank, or any thing'

    let priceData = {};
    if (rank != maxRank){
        priceData = await getOrdersOnItemRank(slug, rank);
    } else {
        priceData = await getOrdersOnItemRank(slug, maxRank);
    }

    const topPrices = priceData?.data;

    const currSellPrice = topPrices?.sell[0]?.platinum;
    //TODO: still need to analyse the prices to figure out if this is correct buy price
    const currBuyPrice = topPrices?.buy[0]?.platinum;
    //TODO: look at 2d graph to figure out the actual price
    const projectedRealPrice = "PLACEHOLDER";
    const image = `https://warframe.market/static/assets/${info.i18n.en.thumb}`;
    const name = info.i18n.en.name;
    return {
        currSellPrice: currSellPrice,
        currBuyPrice: currBuyPrice, 
        projectedRealPrice: projectedRealPrice, 
        topPrices: topPrices, 
        itemName: name, 
        imageURL: image
    }
}