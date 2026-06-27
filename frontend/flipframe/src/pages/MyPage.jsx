import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../services/api';
export const MyPage = () => {
    const { data: items, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: getAllOrders
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    console.log("Items:", items);
    return (
        <div>
        <h1>Product List</h1>
        <ul>
            {items?.map((item) => (
            <li key={item.id}>
                {item.name} - ${item.price}
            </li>
            ))}
        </ul>
    </div>
    )
}