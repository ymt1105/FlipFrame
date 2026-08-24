//DELETE ONCE FULLY DEPLOYED

const API_URL = "http://localhost:3000";

async function handleResponse(response, contextMessage) {
    if (!response.ok) {
        throw new Error(`${contextMessage}: ${response.statusText} (${response.status})`);
    }
    return await response.json();
}

export async function getAllOrders() {
    const response = await fetch(`${API_URL}/orders`);
    return handleResponse(response, "Failed to fetch orders");
}

export async function lookupItemArray(itemArray) {
    const response = await fetch(`${API_URL}/items/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idArray: itemArray })
    });
    return handleResponse(response, "Failed to lookup item array");
}

export async function getItemOrders(input) {
    const slug = typeof input === 'object' ? input.slug : input;
    const response = await fetch(`${API_URL}/items/${slug}/orders`);
    return handleResponse(response, "Failed to fetch item orders");
}

export async function getOrdersOnItem(slug) {
    const response = await fetch(`${API_URL}/items/${slug}/orders/top?rank=0`);
    return handleResponse(response, "Failed to fetch top orders for item");
}

export async function getOrdersOnItemRank(slug, maxRank) {
    const response = await fetch(`${API_URL}/items/${slug}/orders/top?rank=${maxRank}`);
    return handleResponse(response, "Failed to fetch ranked orders for item");
}

export async function getLookup() {
    const response = await fetch(`${API_URL}/items/lookup`);
    return handleResponse(response, "Failed to fetch item lookup sheet");
}

export async function getRivenLookup() {
    const response = await fetch(`${API_URL}/rivens/lookup`);
    return handleResponse(response, "Failed to fetch Riven lookup sheet");
}

export async function getItemContracts(slug) {
    const response = await fetch(`${API_URL}/rivens/weapons/${slug}`);
    return handleResponse(response, "Failed to fetch Riven contracts for weapon");
}

export async function getAllContracts() {
    const response = await fetch(`${API_URL}/rivens`);
    return handleResponse(response, "Failed to fetch Riven contracts");
}

export async function bump() {
    const response = await fetch(`${API_URL}/orders/bump`, { method: 'POST' });
    return handleResponse(response, "Failed to bump order");
}

export async function addOrder(payload) {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return handleResponse(response, "Failed to create order");
}

export async function editOrder(orderID, payload) {
    const response = await fetch(`${API_URL}/orders/${orderID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return handleResponse(response, "Failed to update order");
}

export async function maximise(){
    const response = await fetch(`${API_URL}/orders/maximise`, { method: 'POST' });
    return handleResponse(response, "Failed to bump order");
}

export async function getAllRelics(){
    const response = await fetch(`${API_URL}/relics`);
    return handleResponse(response, "Failed to fetch relics");
}