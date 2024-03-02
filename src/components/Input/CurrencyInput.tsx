import { RefObject } from "react";

type CurrencyInputProps = {
    inputRef: RefObject<HTMLInputElement>;
    defaultValue?: string;
};

function CurrencyInput({ inputRef, defaultValue}: CurrencyInputProps) {
    return (
        <div className="relative shadow-sm rounded-md">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-400">$</span>
            </div>
            <input
                type="number"
                step={0.01}
                min={0}
                ref={inputRef}
                onWheel={(e) => {
                    (e.target as HTMLElement).blur();
                }}
                defaultValue={defaultValue}
                placeholder="0.00"
                className="block border-0 bg-neutral-800 py-1.5 pr-3 pl-7 rounded-md w-full text-white placeholder:text-gray-400"
                aria-describedby="price-currency"
            />
        </div>
    );
}

export default CurrencyInput;
