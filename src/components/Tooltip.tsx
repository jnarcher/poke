import { PropsWithChildren, useState } from "react";
import { BsPlayFill } from "react-icons/bs";

type TooltipProps = {
    text: string,
    waitTime?: number;
};

function Tooltip({
    children,
    text,
    waitTime = 0,
}: PropsWithChildren<TooltipProps>) {
    const [visible, setVisible] = useState<boolean>(false);

    const [waitTimeout, setWaitTimout] = useState<NodeJS.Timeout | null>(null);

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                setWaitTimout(
                    setTimeout(() => {
                        setVisible(true);
                    }, waitTime)
                );
            }}
            onMouseLeave={() => {
                if (waitTimeout !== null) clearTimeout(waitTimeout);
                setVisible(false);
            }}
        >
            <div
                className={`left-1/2 -translate-x-1/2 text-center bg-blue-500 rounded-md transition-all -top-14 whitespace-nowrap absolute p-2 px-3 ${
                    visible ? "opacity-100 z-50" : "opacity-0 -z-50"
                }`}
            >
                <BsPlayFill size={30} className="-bottom-4 left-1/2 absolute text-blue-500 -translate-x-1/2 rotate-90"/>
                <span>{text}</span>
            </div>
            {children}
        </div>
    );
}

export default Tooltip;
