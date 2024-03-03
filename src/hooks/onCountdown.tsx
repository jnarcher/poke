import { useEffect, useState } from "react";

/**
 *
 * @param initialTime starting countdown time in milliseconds
 * @param callback executed when timer reaches zero
 * @param interval optional
 */
export function useCountdown(
    initialTime: number,
    callback: () => void,
    interval: number = 1000
) {
    const [time, setTime] = useState<number>(initialTime);
    const [isPaused, setIsPaused] = useState<boolean>(true);

    useEffect(() => {
        if (isPaused) return;
        const int = setInterval(() => {
            if (time > 0) setTime((prev) => prev - interval);
        }, interval);

        if (time === 0) callback();

        return () => clearInterval(int);
    }, [time, isPaused]);

    return {
        time,
        isPaused,
        togglePause: () => setIsPaused((prev) => !prev),
        reset: () => {
            setIsPaused(true);
            setTime(initialTime);
        }
    };
}
