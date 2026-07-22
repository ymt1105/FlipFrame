import { NavLink } from "react-router-dom"
export const NavBar = () => {
    return (
        <div>
            <div className="grid grid-cols-5">
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

                <NavLink to="/holdings" className ={({ isActive }) => 
                        `p-2 text-white block ${isActive ? "bg-green-700 font-bold" : "bg-green-500"}`
                    }>
                    Holdings
                </NavLink>

                <NavLink to="/current" className ={({ isActive }) => 
                        `p-2 text-white block ${isActive ? "bg-green-700 font-bold" : "bg-green-500"}`
                    }>
                    Your Page
                </NavLink>

                <NavLink to="/riven" className ={({ isActive }) => 
                        `p-2 text-white block ${isActive ? "bg-purple-700 font-bold" : "bg-purple-500"}`
                    }>
                    Riven Search
                </NavLink>
            </div>
        </div>
    );
}