import { useState } from 'react';

export function GeneralButton({ onClickMethod, displayLabel, className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (onClickMethod) {
        await onClickMethod(e);
      }
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      className={`
        relative px-4 py-2 transition-all bg-green-500 hover:cursor-pointer
        ${isLoading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Processing...
        </span>
      ) : (
        displayLabel
      )}
    </button>
  );
}