export const AddItemControls = () => {
    return (
        <div>
            <input
                type="number"
                min="0"
                max="20"
                value="1" 
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                className="border p-1 w-16"          
            />
        </div>
    );
}