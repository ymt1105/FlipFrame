export const GeneralButton = ({onClickMethod, displayLabel, type = "button", className = ""}) => {
    return (
        <button type={type} onClick = {onClickMethod} className={`flex bg-green-500 p-x-3 ${className}`}>{displayLabel}</button>
    );
}