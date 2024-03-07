import { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";

type Props = {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
    onAdd?: () => void;
    onSubtract?: () => void;
};

function IncrementInput({
    label,
    value,
    onChange,
    onBlur,
    onAdd,
    onSubtract,
}: Props) {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            className="flex justify-between w-full"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span className="w-24 text-2xl text-neutral-400">{label}</span>
            <div className="flex items-center">
                <button
                    type="button"
                    className={`transition-all text-2xl active:-translate-x-1 rotate-180 ${
                        hover ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={onSubtract}
                >
                    <BsCaretRightFill />
                </button>
                <input
                    type="number"
                    placeholder="-"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    onBlur={(e) => onBlur && onBlur(e.target.value)}
                    className={`bg-neutral-700 p-1 rounded-xl w-14 text-2xl text-center transition-all ${
                        hover ? "bg-opacity-100" : "bg-opacity-0"
                    }`}
                />
                <button
                    type="button"
                    className={`transition-all text-2xl active:translate-x-1 ${
                        hover ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={onAdd}
                >
                    <BsCaretRightFill />
                </button>
            </div>
        </div>
    );
}

export default IncrementInput;
