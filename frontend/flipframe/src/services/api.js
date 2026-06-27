const API_URL = import.meta.env.VITE_API_URL;

export async function getAllOrders(){
    const response = await fetch(`${API_URL}/order`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}