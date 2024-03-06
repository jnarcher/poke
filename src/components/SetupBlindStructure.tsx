import { useEffect, useState } from "react";
import BlindsTable from "./BlindsTable";
import { getBlindPresetNames, getBlindStructure } from "../helpers/blinds";
import { useTournament } from "../providers/TournamentProvider";

function SetupBlindStructure() {
    const tournament = useTournament();
    const stateBlindStructure = tournament.state.blindStructure;

    const [preset, setPreset] = useState<string>(
        stateBlindStructure.preset.toString()
    );

    useEffect(() => {
        setPreset("shortstack-4hr/15min");
    }, []);

    useEffect(() => {
        if (preset === "custom") return;
        loadPreset(preset);
    }, [preset]);

    function loadPreset(presetName: string) {
        const structure = getBlindStructure(presetName);

        tournament.setTournamentLength(structure.tournamentLength);
        tournament.setRoundLength(structure.roundLength);
        tournament.setStartingStack(structure.startingStack);
        tournament.setSmallestDenomination(structure.smallestDenomination);
        tournament.setBlindPreset(presetName);
        tournament.setBlinds(structure.structure);
        tournament.setRestBreaks(structure.restBreaks);
    }

    const structure = getBlindStructure(preset) as BlindStructure;

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
                            {getBlindPresetNames().map((v, idx) => (
                                <option key={idx}>{v}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex-grow">
                    <BlindsTable blindStructure={structure} />
                </div>
            </div>
        </div>
    );
}

export default SetupBlindStructure;
