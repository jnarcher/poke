import { RefObject } from "react";
import CountInput from "./CountInput";
import CurrencyInput from "./CurrencyInput";
import TextInput from "./TextInput";

type InputType = {
    type?: string;
    inputRef: RefObject<HTMLInputElement>;
    unit?: string,
    defaultValue?: string,
};

function Input({ type, inputRef, unit, defaultValue }: InputType) {
    function getInput() {
        switch (type) {
            case "currency":
                return (
                    <CurrencyInput
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                    />
                );
            case "count":
                return (
                    <CountInput
                        step={1}
                        unit={unit}
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                    />
                );
            case "float":
                return (
                    <CountInput
                        step={0.01}
                        unit={unit}
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                    />
                );
            case "text":
                return (
                    <TextInput
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                    />
                );
            default:
                return (
                    <TextInput
                        defaultValue={defaultValue}
                        inputRef={inputRef}
                    />
                );
        }
    }

    return <div>{getInput()}</div>;
}

export default Input;
