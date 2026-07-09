import { useQuery } from '@tanstack/react-query'
import { Top5OrderBook } from './Top5OrderBook'
import { getImage } from '../services/pricedata'
export const TickerCard = ({itemSlug}) => {
    const { data: image, isLoading} = useQuery({
        queryKey: ["item", itemSlug],
        queryFn: () => getImage(itemSlug)
    })
    return (
        <div>
            <div className = "bg-white p-4 border rounded shadow-md flex flex-col h-full">
                <div class>
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