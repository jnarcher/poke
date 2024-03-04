import { TimerState, useTimer } from "../hooks/useTimer";
import { useEffect, useState } from "react";
import { useTournament } from "../providers/TournamentProvider";
import {
    BsArrowCounterclockwise,
    BsPauseFill,
    BsPlayFill,
} from "react-icons/bs";

function BlindLevelCountdown() {
    const [blindLevel, setBlindLevel] = useState<number>(0);

    const { state } = useTournament();

    const timer = useTimer();

    useEffect(() => {
        if (getRoundTime() === 0) {
            if (blindLevel === state.blindStructure.blinds.length - 1)
                timer.togglePause();
            else setTimeout(() => setBlindLevel((prev) => prev + 1), 1000);
        }
    }, [timer.time]);

    const getRoundTime = () => {
        const roundLengthMs = state.blindStructure.roundLength * 60 * 1000;

        if (timer.state === TimerState.IDLE) return roundLengthMs;

        const timeIntoRound = (timer.time % roundLengthMs) + 1000;
        return roundLengthMs - timeIntoRound;
    };

    const minutes = (time: number) => {
        return Math.floor((time - hours(time)) / (1000 * 60));
    };
    const seconds = (time: number) => {
        return (time / 1000) % 60;
    };
    const hours = (time: number) => {
        return Math.floor(time / (1000 * 60 * 60));
    };

    const padTime = (time: number) => {
        return time < 10 ? `0${time}` : time.toString();
    };

    const convertThousands = (amount: number) => {
        return amount >= 1000 ? `${amount / 1000}k` : amount.toString();
    };

    return (
        <div className="bg-neutral-900 px-20 p-10 rounded-lg w-3/4">
            <div className="relative flex justify-between items-center">
                <div className="top-1/2 left-1/2 absolute flex flex-col items-center w-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className={`font-mono text-[200px] leading-none ${
                            getRoundTime() < 10000 ? "text-red-400" : ""
                        } ${
                            timer.state === TimerState.PAUSED
                                ? "text-neutral-400"
                                : ""
                        }`}
                    >
                        {padTime(minutes(getRoundTime()))}:
                        {padTime(seconds(getRoundTime()))}
                    </div>
                    <div
                        className={`font-mono text-[70px] opacity-25 leading-none`}
                    >
                        {padTime(hours(timer.time))}:
                        {padTime(minutes(timer.time))}:
                        {padTime(seconds(timer.time))}
                    </div>
                    <div className="flex gap-2 mt-9">
                        <button
                            onClick={timer.togglePause}
                            className="hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                        >
                            {timer.state !== TimerState.ACTIVE ? (
                                <BsPlayFill size={80} />
                            ) : (
                                <BsPauseFill size={80} />
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setBlindLevel(0);
                                timer.reset();
                            }}
                            className="hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                        >
                            <BsArrowCounterclockwise size={80} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-5 w-1/4 0">
                    <div>
                        <div className="font-bold text-2xl text-neutral-600 italic">
                            Previous
                        </div>
                        {blindLevel > 0 ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.blinds[
                                                blindLevel - 1
                                            ][0]
                                        )}
                                    </span>
                                </div>
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.blinds[
                                                blindLevel - 1
                                            ][1]
                                        )}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="font-mono text-5xl text-neutral-600">
                                <div>-</div>
                                <div>-</div>
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="flex items-end">
                            <span className="text-4xl text-neutral-700">
                                SB
                            </span>
                            <span className="font-mono text-9xl leading-none">
                                {convertThousands(
                                    state.blindStructure.blinds[blindLevel][0]
                                )}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-4xl text-neutral-700">
                                BB
                            </span>
                            <span className="font-mono text-9xl">
                                {convertThousands(
                                    state.blindStructure.blinds[blindLevel][1]
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-2xl text-neutral-600 italic">
                            Next
                        </div>
                        {blindLevel + 1 < state.blindStructure.blinds.length ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.blinds[
                                                blindLevel + 1
                                            ][0]
                                        )}
                                    </span>
                                </div>
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.blinds[
                                                blindLevel + 1
                                            ][1]
                                        )}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="text-5xl text-neutral-500">
                                <div>END</div>
                                <div>-</div>
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-1/4">
                    <div className="text-right">
                        <div className="font-bold text-2xl text-neutral-600 italic">
                            Previous
                        </div>
                        {blindLevel > 0 ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="gap-2">
                                    <span>
                                        {
                                            state.blindStructure.blinds[
                                                blindLevel - 1
                                            ][2]
                                        }
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="font-mono text-5xl text-neutral-600">
                                <div>-</div>
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="flex justify-end items-center">
                            <span className="font-mono text-9xl">
                                {state.blindStructure.blinds[blindLevel][2]}
                            </span>
                            <span className="text-4xl text-neutral-700">
                                ANTE
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-2xl text-neutral-600 italic">
                            Next
                        </div>
                        {blindLevel + 1 < state.blindStructure.blinds.length ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {
                                            state.blindStructure.blinds[
                                                blindLevel + 1
                                            ][2]
                                        }
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <span className="font-mono text-5xl text-neutral-500">
                                END
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlindLevelCountdown;
