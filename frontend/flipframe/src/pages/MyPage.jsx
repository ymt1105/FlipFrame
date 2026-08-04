import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react';
import { getAllOrders, lookupItemArray, getAllContracts, bump, maximise } from '../services/api';
import { RivenCard } from '../features/rivens/RivenCard';
import { OrderCard } from '../features/orders/OrderCard';
import { GeneralButton } from '../components/GeneralButton';

export const MyPage = () => {
    const { data: items, isLoading: isOrdersLoading, error: ordersError, isSuccess } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders
    });

    const {data: contracts} = useQuery({
        queryKey: ["contracts"],
        queryFn: getAllContracts
    })

    const { data: lookupData, isLoading: isLookupLoading } = useQuery({
        queryKey: ["lookup", items?.data], 
        queryFn: () => {
            const ids = items.data.map(item => item.itemId);
            return lookupItemArray(ids);
        },
        enabled: isSuccess && !!items?.data && items.data.length > 0 
    });

    const lookupMap = useMemo(() => {
    const map = new Map();
    if (!lookupData) return map;
        
        lookupData.forEach(res => {
            const id = String(res._id || res.id);
            map.set(id, res);
        });
        
        return map;
    }, [lookupData]);

    if (isOrdersLoading) return <div>Loading...</div>;
    if (ordersError) return <div>Error: {ordersError.message}</div>;

    const auctions = contracts?.payload?.auctions;
    let sellOrders = [];
    let buyOrders = [];
    const filteredOrders = items?.data.filter(order => {
        if (order.type == "buy"){
            buyOrders.push(order)
        } else {
            sellOrders.push(order)
        }
        return order
    });

    return (
        <div>
            <h1 className = "text-6xl font-bold py-5">My Orders</h1>
            <div className='grid grid-cols-2'>
                <GeneralButton className="w-fill" onClickMethod={bump} displayLabel={"Bump all my orders"}/>
                <GeneralButton onClickMethod={maximise} displayLabel={"Maximise All Sell Orders"}/>
            </div>
            {isLookupLoading && <p>Loading extra details...</p>}
            <div className='grid grid-cols-2'>
                <div>
                    <h2 className='text-xl font-bold bg-rose-300'>Sell</h2>
                    <ul className='m-5 flex flex-col gap-5'>
                        {sellOrders.map((item) => {
                            const lookupResult = lookupMap.get(String(item.itemId));
                            return (
                                <OrderCard key = {item.id} orderData = {item} itemInfo={lookupResult}/>
                            );
                        })}
                        {auctions?.map((contract) => {
                            return (
                                <RivenCard 
                                    key = {contract.id} 
                                    rivenData = {contract}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h2 className='text-xl font-bold bg-green-300'>Buy</h2>

                    <ul className='m-5 flex flex-col gap-5'>
                        {buyOrders.map((item) => {
                            const lookupResult = lookupMap.get(String(item.itemId));
                            return (
                                <OrderCard key = {item.id} orderData = {item} itemInfo={lookupResult}/>
                            );
                        })}
                    </ul>
                </div>
            </div>
            
        </div>
    )
}