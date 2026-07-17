import { useQuery } from '@tanstack/react-query'
import { Top5OrderBook } from './Top5OrderBook'
import { getItemData } from '../services/itemdata'
export const TickerCard = ({itemSlug}) => {
    const { data: image, isLoading} = useQuery({
        queryKey: ["item", itemSlug],
        queryFn: () => getItemData(itemSlug).then(data => data.response.imageURL)
    })
    return (
        <div>
            <div className = "bg-white p-4 border rounded shadow-md flex flex-col h-full">
                <div>
                    <h2>{itemSlug}</h2>
                    <img src={image} className='max-w-40'/>
                </div>
                <Top5OrderBook 
                    slug = {itemSlug}
                />
            </div>

        </div>
    )
}