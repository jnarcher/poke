import { useCountdown } from "../hooks/onCountdown";

function BlindLevelCoundown() {
    const initTimeSeconds = 200;
    const { time, isPaused, togglePause, reset } = useCountdown(
        initTimeSeconds * 1000,
        () => console.log("timer finished")
    );

    const minutes = () => Math.floor(time / 60000);
    const seconds = () => {
        let val = (time / 1000) % 60;
        return val < 10 ? `0${val}` : `${val}`;
    };

    return (
        <div className="flex flex-col bg-neutral-900 p-7 rounded-lg">
            <div className="flex justify-end items-center p-10 font-mono text-9xl">
                <span>{minutes()}</span>
                <span>:</span>
                <span>{seconds()}</span>
            </div>
            <button onClick={togglePause} className="bg-slate-800 p-2">
                {isPaused ? "START" : "PAUSE"}
            </button>
            <button onClick={reset} className="bg-slate-800 p-2">
                RESET
            </button>
        </div>
    );
}

export default BlindLevelCoundown;
