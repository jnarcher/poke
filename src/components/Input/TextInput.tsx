import { ChangeEvent } from "react";

type TextInputType = {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({ value, onChange }: TextInputType) {
    return (
        <div className="relative shadow-sm rounded-md">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="block border-0 bg-neutral-800 py-1.5 pl-3 rounded-md w-full text-white placeholder:text-gray-400"
            />
        </div>
    );
}

export default TextInput;
