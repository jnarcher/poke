import { FormEvent, useEffect, useState } from "react";
import Input from "./Input/Input";
import BlindsTable from "./BlindsTable";
import { getBlindPresetNames, getStructure } from "../helpers/blinds";

function SetupBlindStructure() {
    const [tournamentLength, setTournamentLength] = useState<string>("4");
    const [roundLength, setRoundLength] = useState<string>("15");
    const [startingStack, setStartingStack] = useState<string>("10000");
    const [smallestDenom, setSmallestDenom] = useState<string>("25");
    const [preset, setPreset] = useState<string>("custom");

    useEffect(() => {
        // updateValues();
    }, []);

    useEffect(() => {
        if (preset === "custom") return;
        loadPreset(preset);
    }, [preset]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.warn("custom blind structure generation not implemented");
    }

    function loadPreset(presetName: string) {
        const structure = getStructure(presetName);
        setTournamentLength(structure.totalLength.toString());
        setRoundLength(structure.roundLength.toString());
        setStartingStack(structure.startingStack.toString());
        setSmallestDenom(structure.smallestDenomiation.toString());
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
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <div className="opacity-60 mb-2">Preset</div>
                            <select
                                value={preset}
                                onChange={(e) => setPreset(e.target.value)}
                                className="block border-neutral-700 bg-neutral-800 p-2 border rounded-md w-full text-sm"
                            >
                                <option value="custom">Custom</option>
                                {getBlindPresetNames().map((v, idx) => (
                                    <option key={idx}>{v}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">
                                Tournament Length
                            </div>
                            <Input
                                type="count"
                                unit="hours"
                                value={tournamentLength}
                                onChange={(e) => {
                                    setPreset("custom");
                                    setTournamentLength(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">
                                Smallest Chip Denomination
                            </div>
                            <Input
                                type="currency"
                                value={smallestDenom}
                                onChange={(e) => {
                                    setPreset("custom");
                                    setSmallestDenom(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">
                                Starting Stack
                            </div>
                            <Input
                                type="currency"
                                value={startingStack}
                                onChange={(e) => {
                                    setPreset("custom");
                                    setStartingStack(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2">Round Length</div>
                            <Input
                                type="count"
                                unit="minutes"
                                value={roundLength}
                                onChange={(e) => {
                                    setPreset("custom");
                                    setRoundLength(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            className="bg-neutral-500 disabled:opacity-20 mt-5 py-2 font-bold disabled:cursor-not-allowed active:scale-95 px-5 rounded-md transition-all self-center"
                            type="submit"
                            disabled={true}
                        >
                            Generate Blinds
                        </button>
                    </form>
                </div>
                <div className="flex-grow max-w-7xl">
                    <BlindsTable
                        presetName={preset}
                        tournamentLength={Number(tournamentLength)}
                        roundLength={Number(roundLength)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SetupBlindStructure;
