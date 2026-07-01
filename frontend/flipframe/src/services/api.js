const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = "http://localhost:3000";

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

export async function getItemInfo(slugorname){
    const slug = typeof slugorname === 'object' ? slugorname.slug : slugorname;
    const response = await fetch(`${API_URL}/item/${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);
    return data;
}