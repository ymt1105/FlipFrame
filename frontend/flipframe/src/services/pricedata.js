import { getItemInfo, getOrdersOnItem } from "./api";

export async function getItemData (slug){
    const itemResponse = await getItemInfo(slug);
    const priceData = await getOrdersOnItem(slug);

    const info = itemResponse?.data;
    const topPrices = priceData?.data;
    const currSellPrice = topPrices?.sell[0]?.platinum;
    //TODO: still need to analyse the prices to figure out if this is correct buy price
    const currBuyPrice = topPrices?.buy[0]?.platinum;
    //TODO: look at 2d graph to figure out the actual price
    const projectedRealPrice = "PLACEHOLDER";
    return [currSellPrice, currBuyPrice, projectedRealPrice, topPrices];
}

export async function getImage (slug){
    const itemResponse = await getItemInfo(slug);
    const info = itemResponse?.data;
    const image = `https://warframe.market/static/assets/${info.i18n.en.thumb}`
    return image;
}