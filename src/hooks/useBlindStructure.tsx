import { blindStructure } from "../data/blindStructure";

type BlindStructureType = {
    name?: string;
    playerCount?: number;
    tournamentLength?: number;
    roundLength?: number;
    startingStack?: number;
    smallestDenomination?: number;
};

export function useBlindStructure({name, playerCount, tournamentLength, roundLength, startingStack, smallestDenomination}: BlindStructureType)  {
    console.warn("TODO: implement blind structure selection");
    let filtered = blindStructure.filter((structure) => structure.name === name);

    if (filtered.length === 1)
        return filtered[0];
    else
        return blindStructure[0];
}