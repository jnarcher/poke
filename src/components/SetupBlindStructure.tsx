import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "./Input/Input"
import BlindsTable from "./BlindsTable";
import { useTournament } from "../hooks/useTournament";

function SetupBlindStructure() {
    const { playerCount } = useTournament();

    const tournamentLengthRef = useRef<HTMLInputElement>(null);
    const smallestDenomRef = useRef<HTMLInputElement>(null);
    const startingStackRef = useRef<HTMLInputElement>(null);
    const roundLengthRef = useRef<HTMLInputElement>(null);

    const [tournamentLength, setTournamentLength] = useState<number>(4);
    const [roundLength, setRoundLength] = useState<number>(20);
    const [startingStack, setStartingStack] = useState<number>(5000);
    const [smallestDenom, setSmallestDenom] = useState<number>(25);

    useEffect(() => {
        updateValues();
    }, []);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateValues();
    }

    function updateValues() {
        if (tournamentLengthRef.current)
            setTournamentLength(Number(tournamentLengthRef.current.value));
        if (roundLengthRef.current)
            setRoundLength(Number(roundLengthRef.current.value));
        if (startingStackRef.current)
            setStartingStack(Number(startingStackRef.current.value));
        if (smallestDenomRef.current)
            setSmallestDenom(Number(smallestDenomRef.current.value));
    }

    return (
        <div className="flex flex-col bg-neutral-900 p-7 rounded-lg">
            <h1 className="mb-5 font-bold text-3xl italic self-center">
                BLIND STRUCTURE
            </h1>
            <div className="flex justify-around gap-5">
                <div className="flex-1 w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div>
                            <div className="opacity-60 mb-2">
                                Tournament Length
                            </div>
                            <Input
                                type="count"
                                unit="hours"
                                defaultValue={tournamentLength.toString()}
                                inputRef={tournamentLengthRef}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">
                                Smallest Chip Denomination
                            </div>
                            <Input
                                type="currency"
                                defaultValue={smallestDenom.toString()}
                                inputRef={smallestDenomRef}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">
                                Starting Stack
                            </div>
                            <Input
                                type="currency"
                                defaultValue={startingStack.toString()}
                                inputRef={startingStackRef}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">Round Length</div>
                            <Input
                                type="count"
                                unit="minutes"
                                defaultValue={roundLength.toString()}
                                inputRef={roundLengthRef}
                            />
                        </div>
                        <button
                            className="active:brightness-110 bg-neutral-500 mt-5 px-5 py-2 rounded-md font-bold transition-all hover:-translate-y-0.5 active:-translate-y-0 self-center hover:scale-105 active:scale-100"
                            type="submit"
                        >
                            Generate Blinds
                        </button>
                    </form>
                </div>
                <div className="flex-grow max-w-7xl">
                    <BlindsTable
                        playerCount={playerCount}
                        tournamentLength={tournamentLength}
                        roundLength={roundLength}
                        startingStack={startingStack}
                    />
                </div>
            </div>
        </div>
    );
}

export default SetupBlindStructure;