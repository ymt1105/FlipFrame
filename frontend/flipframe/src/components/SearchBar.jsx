export const SearchBar = ({ onSearch }) => {
    return(
        <div>
            <label>Search:</label>
            <input 
                type="text"
                placeholder="Searchbar"
                className="border p-2 rounded w-full"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}