import { TimerState, useTimer } from "../hooks/useTimer";
import { useEffect, useState } from "react";
import { useTournament } from "../providers/TournamentProvider";
import {
    BsArrowCounterclockwise,
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsPauseFill,
    BsPlayFill,
} from "react-icons/bs";
import Tooltip from "./Tooltip";

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
        return Math.floor(time / (1000 * 60)) % 60;
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

    const getRoundCompletionPercentage = () => {
        const roundTimeSec = getRoundTime() / 1000;
        const roundLengthSec = state.blindStructure.roundLength * 60;

        const percentage = (roundLengthSec - roundTimeSec) / roundLengthSec;
        return percentage;
    };

    return (
        <div className="relative bg-neutral-900 px-20 p-10 rounded-lg w-full overflow-hidden">
            {/* Background Progress Bar */}
            <div
                className="top-0 left-1/2 absolute bg-white bg-opacity-5 h-full transition-all -translate-x-1/2"
                style={{
                    width: `${(1 - getRoundCompletionPercentage()) * 100}%`,
                }}
            />
            <div className="relative flex justify-between items-center">
                {/* Timer */}
                <div className="top-1/2 left-1/2 absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
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
                        <Tooltip
                            text={
                                timer.state !== TimerState.ACTIVE
                                    ? "Pause"
                                    : "Play"
                            }
                            waitTime={500}
                        >
                            <button
                                onClick={timer.togglePause}
                                className="relative hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                            >
                                {timer.state !== TimerState.ACTIVE ? (
                                    <BsPlayFill size={40} />
                                ) : (
                                    <BsPauseFill size={40} />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip text="Reset Blind Level" waitTime={500}>
                            <button
                                onClick={() => {
                                    timer.setTime(
                                        blindLevel *
                                            state.blindStructure.roundLength *
                                            60 *
                                            1000
                                    );
                                }}
                                className="relative hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                            >
                                <BsArrowCounterclockwise size={40} />
                            </button>
                        </Tooltip>
                        <Tooltip text="Previous Blind Level" waitTime={500}>
                            <button
                                onClick={() => {
                                    const newLevel = Math.max(
                                        0,
                                        blindLevel - 1
                                    );
                                    setBlindLevel(newLevel);
                                    timer.setTime(
                                        newLevel *
                                            state.blindStructure.roundLength *
                                            60 *
                                            1000
                                    );
                                }}
                                className="relative hover:bg-neutral-800 disabled:opacity-5 disabled:scale-100 active:scale-95 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                                disabled={blindLevel <= 0}
                            >
                                <BsFillArrowLeftCircleFill size={40} />
                            </button>
                        </Tooltip>
                        <Tooltip text="Next Blind Level" waitTime={500}>
                            <button
                                onClick={() => {
                                    const newLevel = Math.max(
                                        0,
                                        blindLevel + 1
                                    );
                                    setBlindLevel(newLevel);
                                    timer.setTime(
                                        newLevel *
                                            state.blindStructure.roundLength *
                                            60 *
                                            1000
                                    );
                                }}
                                className="relative hover:bg-neutral-800 active:scale-95 opacity-50 disabled:scale-100 hover:opacity-100 disabled:opacity-5 p-2 rounded-full transition-colors"
                                disabled={
                                    blindLevel >=
                                    state.blindStructure.blinds.length - 1
                                }
                            >
                                <BsFillArrowRightCircleFill size={40} />
                            </button>
                        </Tooltip>
                    </div>
                </div>
                {/* Blinds */}
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="text-2xl text-neutral-600 italic">
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
                            <span className="text-4xl text-neutral-600">
                                SB
                            </span>
                            <span className="font-mono text-9xl leading-none">
                                {convertThousands(
                                    state.blindStructure.blinds[blindLevel][0]
                                )}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-4xl text-neutral-600">
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
                        <div className="text-2xl text-neutral-600 italic">
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
                {/* Antes */}
                <div className="flex flex-col gap-5">
                    <div className="text-right">
                        <div className="text-2xl text-neutral-600 italic">
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
                            <span className="text-4xl text-neutral-600">
                                ANTE
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl text-neutral-600 italic">
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
