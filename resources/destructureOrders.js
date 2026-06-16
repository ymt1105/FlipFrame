export const destructureOrders = async (ordersJson) => {
    const result = ordersJson.data.filter(item => item.user.status == 'ingame' || item.user.status == 'online').map(({ platinum, quantity, type, user }) => ({
      platinum: platinum,
      quantity: quantity,
      type : type,
      lastSeen : user.lastSeen,
      status : user.status
    }));
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const filteredResults = result.filter(item => {
      const lastSeenDate = new Date(item.lastSeen);
      
      return (lastSeenDate > twoDaysAgo);
    });


    const counts = filteredResults.reduce((acc, curr) => {
      const key = curr.platinum; 
      if (!acc[key]) {
        acc[key] = 0
      }

      if (curr.type == 'buy'){
        acc[key] -= 1;
      } else {
        acc[key] += 1;
      }
      return acc;
    }, {});

  const reportJson = Object.entries(counts)
    .sort((a, b) => a - b)
    .map(([price, count]) => ({
      price: Number(price),
      orderCount: count
    }));

  return reportJson;
}