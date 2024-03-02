import { RefObject } from "react";

type CountInputType = {
    inputRef: RefObject<HTMLInputElement>;
    step: number;
    unit?: string;
    defaultValue?: string;
};

function CountInput({ inputRef, step, unit, defaultValue }: CountInputType) {
    let stepDecimals = (step + "").split(".")[1];
    if (stepDecimals === undefined) stepDecimals = "";

    const placeholder =
        "0" +
        (stepDecimals.length > 0
            ? "." + Array(stepDecimals.length).fill("0").join("")
            : "");

    return (
        <div className="relative shadow-sm rounded-md">
            <input
                type="number"
                min={0}
                step={step}
                ref={inputRef}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onWheel={(e) => {
                    (e.target as HTMLElement).blur();
                }}
                className="block border-0 bg-neutral-800 py-1.5 pl-3 rounded-md w-full text-white placeholder:text-gray-400"
            />
            {unit && (
                <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
                    <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                    >
                        {unit}
                    </span>
                </div>
            )}
        </div>
    );
}

export default CountInput;