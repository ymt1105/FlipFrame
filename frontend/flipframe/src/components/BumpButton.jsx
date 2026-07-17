import { bump } from "../services/api"

export const BumpButton = () =>{
    const handleBump = async () => {
        const status = bump();
    }
    return (
        <button onClick={handleBump} className="flex bg-green-500">Bump all orders</button>
    )
}