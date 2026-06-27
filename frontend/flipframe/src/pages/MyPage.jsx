import { useQuery } from '@tanstack/react-query'
import { getAllOrders, lookupItemArray } from '../services/api';

export const MyPage = () => {
    // 1. Fetch the primary list
    const { data: items, isLoading: isOrdersLoading, error: ordersError, isSuccess } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders
    });

    const { data: lookupData, isLoading: isLookupLoading } = useQuery({
        queryKey: ["lookup", items?.data], 
        queryFn: () => {
            const ids = items.data.map(item => item.itemId);
            return lookupItemArray(ids);
        },
        enabled: isSuccess && !!items?.data && items.data.length > 0 
    });

    if (isOrdersLoading) return <div>Loading...</div>;
    if (ordersError) return <div>Error: {ordersError.message}</div>;

    return (
        <div>
            <h1>Product List</h1>
            {isLookupLoading && <p>Loading extra details...</p>}
            
            <ul>
                {items?.data?.map((item) => {
                    const lookupResult = lookupData?.find(res => res.id === item.itemId);
                    console.log("Full Order Object:", item.itemId);
                    return (
                        <li key={item.id}>
                            {item.type} — {item.platinum} Platinum
                            
                            {lookupResult && (
                                <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                                    | Lookup: {lookupResult.name} 
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}