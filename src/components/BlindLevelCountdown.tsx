import { TimerState, useTimer } from "../hooks/useTimer";
import { useEffect, useState } from "react";
import { useTournament } from "../providers/TournamentProvider";
import {
    BsArrowCounterclockwise,
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
    BsFillVolumeMuteFill,
    BsPauseFill,
    BsPlayFill,
    BsVolumeUpFill,
} from "react-icons/bs";
import Tooltip from "./Tooltip";
import nextRound from "../assets/audio/next_round.wav";
import beep from "../assets/audio/beep.wav";

function BlindLevelCountdown() {
    const { state } = useTournament();

    const [blindLevel, setBlindLevel] = useState<number>(0);

    const [onBreak, setOnBreak] = useState<boolean>(false);
    const [breakIdx, setBreakIdx] = useState<number>(0);
    const [currentBreak, setCurrentBreak] = useState<RestBreak | null>(
        state.blindStructure.restBreaks[0] ?? null
    );

    const [isMuted, setIsMuted] = useState<boolean>(false);

    const timer = useTimer();
    const breakTimer = useTimer();

    useEffect(() => {
        if (currentBreak && getTimeUntilBreak() === 0) {
            setOnBreak(true);
            timer.setTime(timer.time); // stop timer and set to idle
            breakTimer.togglePause();
            return;
        }

        if (timer.state === TimerState.IDLE) return;

        if (getRoundTimeLeft() === 0) {
            if (!isMuted && timer.state === TimerState.ACTIVE) {
                const roundCompleteSound = new Audio(nextRound);
                roundCompleteSound.play();
            }

            if (blindLevel === state.blindStructure.structure.length - 1)
                timer.togglePause();
            else setTimeout(() => setBlindLevel((prev) => prev + 1), 1000);
        } else if (!isMuted && getRoundTimeLeft() < 10000) {
            const underTenSound = new Audio(beep);
            underTenSound.play();
        }
    }, [timer.time]);

    useEffect(() => {
        if (!onBreak || !currentBreak) return;
        if (getBreakTimeLeft() === 0) {
            if (!isMuted && breakTimer.state === TimerState.ACTIVE) {
                const roundCompleteSound = new Audio(nextRound);
                roundCompleteSound.play();
            }

            setTimeout(() => {
                setCurrentBreak(
                    state.blindStructure.restBreaks[breakIdx + 1] ?? null
                );
                setBreakIdx((prev) => prev + 1);
                breakTimer.reset();
                setOnBreak(false);
                timer.togglePause();
            }, 1000);
        } else if (!isMuted && getBreakTimeLeft()) {
            const underTenSound = new Audio(beep);
            underTenSound.play();
        }
    }, [breakTimer, onBreak]);

    const getRoundTimeLeft = () => {
        const roundLengthMs = state.blindStructure.roundLength * 60 * 1000;

        if (timer.state === TimerState.IDLE) return roundLengthMs;

        const timeIntoRound = (timer.time % roundLengthMs) + 1000;
        return roundLengthMs - timeIntoRound;
    };

    const getBreakTimeLeft = () => {
        if (currentBreak === null) return 100000000;
        const breakLengthMs = currentBreak.breakLength * 60 * 1000;
        if (breakTimer.state === TimerState.IDLE) return breakLengthMs;
        return breakLengthMs - breakTimer.time;
    };

    const getTimeUntilBreak = () => {
        if (currentBreak === null) return 0;
        return (
            currentBreak.minutesIn * 60 * 1000 -
            timer.time -
            (timer.state === TimerState.IDLE ? 0 : 1000)
        );
    };

    const minutes = (time: number) => {
        return Math.floor(time / (1000 * 60)) % 60;
    };

    const seconds = (time: number) => {
        return Math.round((time / 1000) % 60);
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
        const roundTimeSec = getRoundTimeLeft() / 1000;
        const roundLengthSec = state.blindStructure.roundLength * 60;

        const percentage = (roundLengthSec - roundTimeSec) / roundLengthSec;
        return percentage;
    };

    const getBreakCompletionPercentage = () => {
        if (currentBreak === null) return 0;
        return breakTimer.time / (1000 * 60) / currentBreak.breakLength;
    };

    return (
        <div className="relative bg-neutral-900 px-20 p-10 rounded-lg w-full overflow-hidden">
            {/* Background Progress Bar */}
            <div
                className={`top-0 left-1/2 absolute ${
                    onBreak ? "bg-blue-400" : "bg-white"
                } bg-opacity-5 h-full transition-all -translate-x-1/2`}
                style={{
                    width: `${
                        (1 -
                            (onBreak
                                ? getBreakCompletionPercentage()
                                : getRoundCompletionPercentage())) *
                        100
                    }%`,
                }}
            />
            <div className="relative flex justify-between items-center">
                {/* Timer */}
                <div className="top-1/2 left-1/2 absolute flex flex-col items-center gap-5 -translate-x-1/2 -translate-y-1/2">
                    <div>
                        <h4 className="mb-3 text-2xl text-center text-neutral-600 italic">
                            Next Break
                        </h4>
                        {currentBreak ? (
                            <div
                                className={`font-mono text-[70px] opacity-25 leading-none`}
                            >
                                {padTime(hours(getTimeUntilBreak()))}:
                                {padTime(minutes(getTimeUntilBreak()))}:
                                {padTime(seconds(getTimeUntilBreak()))}
                            </div>
                        ) : (
                            <div className="opacity-25 font-mono text-[70px] text-center leading-none">
                                -
                            </div>
                        )}
                    </div>
                    {!onBreak ? (
                        <div
                            className={`font-mono text-[200px] leading-none ${
                                getRoundTimeLeft() < 10000 ? "text-red-400" : ""
                            } ${
                                timer.state === TimerState.PAUSED
                                    ? "text-neutral-400"
                                    : ""
                            }`}
                        >
                            {padTime(minutes(getRoundTimeLeft()))}:
                            {padTime(seconds(getRoundTimeLeft()))}
                        </div>
                    ) : (
                        <div
                            className={`font-mono text-[200px] leading-none ${
                                getBreakTimeLeft() < 10000
                                    ? "text-red-400"
                                    : "text-blue-400"
                            } ${
                                breakTimer.state === TimerState.PAUSED
                                    ? "text-opacity-75"
                                    : ""
                            }`}
                        >
                            {padTime(minutes(getBreakTimeLeft()))}:
                            {padTime(seconds(getBreakTimeLeft()))}
                        </div>
                    )}
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
                                onBreak
                                    ? breakTimer.state !== TimerState.ACTIVE
                                        ? "Pause"
                                        : "Play"
                                    : timer.state !== TimerState.ACTIVE
                                    ? "Pause"
                                    : "Play"
                            }
                            waitTime={500}
                        >
                            <button
                                onClick={
                                    onBreak
                                        ? breakTimer.togglePause
                                        : timer.togglePause
                                }
                                className="relative hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                            >
                                {(
                                    onBreak
                                        ? breakTimer.state !== TimerState.ACTIVE
                                        : timer.state !== TimerState.ACTIVE
                                ) ? (
                                    <BsPlayFill size={40} />
                                ) : (
                                    <BsPauseFill size={40} />
                                )}
                            </button>
                        </Tooltip>
                        <Tooltip
                            text={onBreak ? "Reset Break" : "Reset Round"}
                            waitTime={500}
                        >
                            <button
                                onClick={() => {
                                    onBreak
                                        ? breakTimer.reset()
                                        : timer.setTime(
                                              blindLevel *
                                                  state.blindStructure
                                                      .roundLength *
                                                  60 *
                                                  1000
                                          );
                                }}
                                className="relative hover:bg-neutral-800 opacity-50 hover:opacity-100 p-2 rounded-full transition-colors"
                            >
                                <BsArrowCounterclockwise size={40} />
                            </button>
                        </Tooltip>
                        <Tooltip text="Previous Round" waitTime={500}>
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
                                disabled={blindLevel <= 0 || onBreak}
                            >
                                <BsFillArrowLeftCircleFill size={40} />
                            </button>
                        </Tooltip>
                        <Tooltip text="Next Round" waitTime={500}>
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
                                        state.blindStructure.structure.length -
                                            1 || onBreak
                                }
                            >
                                <BsFillArrowRightCircleFill size={40} />
                            </button>
                        </Tooltip>
                        <Tooltip
                            text={isMuted ? "Unmute" : "Mute"}
                            waitTime={500}
                        >
                            <button
                                onClick={() => setIsMuted((prev) => !prev)}
                                className="relative hover:bg-neutral-800 active:scale-95 opacity-50 disabled:scale-100 hover:opacity-100 disabled:opacity-5 p-2 rounded-full transition-colors"
                            >
                                {isMuted ? (
                                    <BsFillVolumeMuteFill size={40} />
                                ) : (
                                    <BsVolumeUpFill size={40} />
                                )}
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
                                            state.blindStructure.structure[
                                                blindLevel - 1
                                            ][0]
                                        )}
                                    </span>
                                </div>
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.structure[
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
                                    state.blindStructure.structure[
                                        blindLevel
                                    ][0]
                                )}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="text-4xl text-neutral-600">
                                BB
                            </span>
                            <span className="font-mono text-9xl">
                                {convertThousands(
                                    state.blindStructure.structure[
                                        blindLevel
                                    ][1]
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl text-neutral-600 italic">
                            Next
                        </div>
                        {blindLevel + 1 <
                        state.blindStructure.structure.length ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.structure[
                                                blindLevel + 1
                                            ][0]
                                        )}
                                    </span>
                                </div>
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.structure[
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
                                        {convertThousands(
                                            state.blindStructure.structure[
                                                blindLevel - 1
                                            ][2]
                                        )}
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
                                {convertThousands(
                                    state.blindStructure.structure[
                                        blindLevel
                                    ][2]
                                )}
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
                        {blindLevel + 1 <
                        state.blindStructure.structure.length ? (
                            <div className="font-mono text-5xl text-neutral-500">
                                <div className="flex-items-end gap-2">
                                    <span>
                                        {convertThousands(
                                            state.blindStructure.structure[
                                                blindLevel + 1
                                            ][2]
                                        )}
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
