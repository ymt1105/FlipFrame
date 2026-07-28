import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react';
import { getAllOrders, lookupItemArray, getAllContracts } from '../services/api';
import { RivenCard } from '../features/rivens/RivenCard';
import { OrderCard } from '../features/orders/OrderCard';
import {BumpButton} from '../components/BumpButton'

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
    return (
        <div>
            <h1>Product List</h1>
            <BumpButton/>
            {isLookupLoading && <p>Loading extra details...</p>}
            
            <ul>
                {items?.data?.map((item) => {
                    const lookupResult = lookupMap.get(String(item.itemId));
                    return (
                        <OrderCard key = {item.id} orderData = {item} itemInfo={lookupResult}/>
                    );
                })}
                
            </ul>
            {auctions?.map((contract) => {
                return (
                    <RivenCard 
                        key = {contract.id} 
                        rivenData = {contract}
                    />
                )
            })}
        </div>
    )
}