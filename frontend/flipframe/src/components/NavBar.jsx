import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return (
        <div>
        <NavLink to="/" className ={({ isActive }) => 
                `p-2 text-white block ${isActive ? "bg-green-700 font-bold" : "bg-green-500"}`
            }>
            Search
        </NavLink>

        <NavLink to="/watchlist" className ={({ isActive }) => 
                `p-2 text-white block ${isActive ? "bg-green-700 font-bold" : "bg-green-500"}`
            }>
            Watchlist
        </NavLink>

        <NavLink to="/current" className ={({ isActive }) => 
                `p-2 text-white block ${isActive ? "bg-green-700 font-bold" : "bg-green-500"}`
            }>
            Your Page
        </NavLink>
        </div>
    );
}