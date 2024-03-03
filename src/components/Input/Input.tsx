import { ChangeEvent } from "react";
import CountInput from "./CountInput";
import CurrencyInput from "./CurrencyInput";
import TextInput from "./TextInput";

type InputType = {
    type?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    unit?: string;
};

function Input({ type, value, onChange, unit }: InputType) {
    function getInput() {
        switch (type) {
            case "currency":
                return (
                    <CurrencyInput
                        value={value}
                        onChange={onChange}
                    />
                );
            case "count":
                return (
                    <CountInput
                        step={1}
                        unit={unit}
                        value={value}
                        onChange={onChange}
                    />
                );
            case "float":
                return (
                    <CountInput
                        step={0.01}
                        unit={unit}
                        value={value}
                        onChange={onChange}
                    />
                );
            default:
                return (
                    <TextInput
                        value={value}
                        onChange={onChange}
                    />
                );
        }
    }

    return <div>{getInput()}</div>;
}

export default Input;
