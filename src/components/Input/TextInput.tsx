import { RefObject } from "react";

type TextInputType = {
    inputRef: RefObject<HTMLInputElement>;
    defaultValue?: string;
};

function TextInput({inputRef, defaultValue}: TextInputType) {
  return (
      <div className="relative shadow-sm rounded-md">
          <input
              type="text"
              defaultValue={defaultValue}
              ref={inputRef}
              className="block border-0 bg-neutral-800 py-1.5 pl-3 rounded-md w-full text-white placeholder:text-gray-400"
          />
      </div>
  );
}

export default TextInput;