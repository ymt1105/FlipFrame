export const destructureOrders = async (ordersJson) => {
    const result = responseJson.data.filter(item => item.user.status == 'ingame' || item.user.status == 'online').map(({ platinum, quantity, type, user }) => ({
      platinum: platinum,
      quantity: quantity,
      type : type,
      lastSeen : user.lastSeen,
      status : user.status
    }));
    return result;
}