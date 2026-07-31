export const GeneralButton = ({onClickMethod, displayLabel}) => {
    console.log(onClickMethod);
    return (
        <div>
            <button onClick = {onClickMethod} className="flex bg-green-500 p-x-3">{displayLabel}</button>
        </div>
    );
}