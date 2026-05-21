async function getData() {
  try {
    const response = await fetch('https://api.warframe.market/v2/orders/item/rhino_prime_set');
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const responseJson = await response.json();
    
    const orders = responseJson.payload?.orders || responseJson.data || [];
    
    const cheapSellOrders = orders.filter(order => {
      return order.type === 'sell' && order.platinum < 100;
    });

    console.log(cheapSellOrders);

  } catch (error) {
    console.error('Error:', error);
  }
}

getData();