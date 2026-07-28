export const AddItemControls = ({value, onChange}) => {
    return (
        <div>
            <input
                type="number"
                min="0"
                max="20"
                value={value} 
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                className="border p-1 w-16"          
            />
        </div>
    );
}