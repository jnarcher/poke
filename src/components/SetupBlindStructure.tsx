import { FormEvent, useEffect, useState } from "react";
import BlindsTable from "./BlindsTable";
import {
    getBlindPresetNames,
    getBlinds,
    getStructure,
} from "../helpers/blinds";
import { useTournament } from "../providers/TournamentProvider";

function SetupBlindStructure() {
    const tournament = useTournament();
    const stateBlindStructure = tournament.state.blindStructure;

    const [tournamentLength, setTournamentLength] = useState<string>(
        stateBlindStructure.tournamentLength.toString()
    );
    const [roundLength, setRoundLength] = useState<string>(
        stateBlindStructure.roundLength.toString()
    );
    const [startingStack, setStartingStack] = useState<string>(
        stateBlindStructure.startingStack.toString()
    );
    const [smallestDenom, setSmallestDenom] = useState<string>(
        stateBlindStructure.smallestDenomination.toString()
    );
    const [preset, setPreset] = useState<string>(
        stateBlindStructure.preset.toString()
    );

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

        tournament.setTournamentLength(structure.totalLength);
        tournament.setRoundLength(structure.roundLength);
        tournament.setStartingStack(structure.startingStack);
        tournament.setSmallestDenomination(structure.smallestDenomiation);
        tournament.setBlindPreset(presetName);
        tournament.setBlinds(structure.blinds);
    }

    const blinds = preset === "custom" ? getBlinds() : getBlinds(preset);

    return (
        <div className="flex flex-col bg-neutral-900 p-7 rounded-lg">
            <h1 className="mb-5 font-bold text-3xl italic self-center">
                BLIND STRUCTURE
            </h1>
            <div className="flex flex-col gap-5">
                <div className="flex-1 w-full">
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
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* <div>
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
                        </div> */}
                        {/* <button
                            className="bg-neutral-500 disabled:opacity-20 mt-5 py-2 font-bold disabled:cursor-not-allowed active:scale-95 px-5 rounded-md transition-all self-center"
                            type="submit"
                            disabled={true}
                        >
                            Generate Blinds
                        </button> */}
                    </form>
                </div>
                <div className="flex-grow">
                    <BlindsTable
                        blinds={blinds}
                        tournamentLength={Number(tournamentLength)}
                        roundLength={Number(roundLength)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SetupBlindStructure;
