import { useQuery } from '@tanstack/react-query'
import { Top5OrderBook } from './Top5OrderBook'
export const TickerCard = ({itemSlug}) => {
    return (
        <div>
            <div>
                <h2>{itemSlug}</h2>
                <Top5OrderBook 
                    slug = {itemSlug}
                />
            </div>

        </div>
    )
}