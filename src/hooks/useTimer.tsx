import { useEffect, useState } from "react";

export enum TimerState {
    IDLE,
    ACTIVE,
    PAUSED,
}

/**
 * @param interval optional
 */
export function useTimer(interval: number = 1000) {
    const [time, setTime] = useState<number>(0);
    const [state, setState] = useState<TimerState>(TimerState.IDLE);

    useEffect(() => {
        if (state !== TimerState.ACTIVE) return;

        let int: NodeJS.Timeout | undefined = undefined;
        int = setInterval(() => {
            setTime((prev) => prev + interval);
        }, interval);

        return () => clearInterval(int);
    }, [time, state]);

    return {
        time,
        state,
        togglePause: () => {
            if (state === TimerState.ACTIVE) setState(TimerState.PAUSED);
            else if (state === TimerState.PAUSED || state === TimerState.IDLE)
                setState(TimerState.ACTIVE);
        },
        reset: () => {
            setState(TimerState.IDLE);
            setTime(0);
        },
    };
}
