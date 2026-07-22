const API_URL = import.meta.env.VITE_API_URL;

export async function getAllOrders(){
    const response = await fetch(`${API_URL}/order`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function lookupItemArray(itemArray){
    const response = await fetch(`${API_URL}/lookup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idArray: itemArray })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export async function getItemInfo(input){
    const slug = typeof input === 'object' ? input.slug : input;
    const response = await fetch(`${API_URL}/item/${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export async function getOrdersOnItem(slug){
    const response = await fetch(`${API_URL}/order/item/${slug}/top/?rank=0`);
    const data = await response.json();
    return data
}

export async function getOrdersOnItemRank(slug, maxRank){
    const response = await fetch(`${API_URL}/order/item/${slug}/top/?rank=${maxRank}`);
    const data = await response.json();
    return data
}


export async function getLookup(){
    const response = await fetch(`${API_URL}/lookup`);
    const data = await response.json();
    return data
}

export async function getRivenLookup(){
    const response = await fetch(`${API_URL}/riven/lookup`);
    const data = await response.json();
    return data
}

export async function getItemContracts(slug){
    const response = await fetch(`${API_URL}/order/riven/${slug}`);
    const data = await response.json();
    return data
}

export async function getAllContracts(){
    const response = await fetch(`${API_URL}/order/riven`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}


export async function bump(){
    const response = await fetch(`${API_URL}/order/bump`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();

    return data
}


export async function addOrder (payload){
    const response = await fetch (`${API_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
        
    }

    const data = await response.json();
    return data;
}

export async function editOrder(orderID, payload){
    const response = await fetch (`${API_URL}/order/${orderID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}