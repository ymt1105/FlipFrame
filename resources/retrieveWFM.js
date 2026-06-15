export const retrieveWFM = async (item_slug) => {
    try {
        const response = await fetch(`https://api.warframe.market/v2/orders/item/${item_slug}`);
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const responseJson = await response.json();
        
        const orders = responseJson.payload?.orders || responseJson.data || [];
        
        return orders;
    } catch (error) {
        console.error('Error:', error);
    }
}