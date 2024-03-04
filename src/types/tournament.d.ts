declare type TournamentData = {
    playerCount: number;
    buyIn: number;
    rebuys: number;
    payoutStructure: PayoutStructure;
    blindStructure: BlindStructure;
}

declare type PayoutStructure = {
    total: number;
    count: number;
    percentages: number[];
}

declare type BlindStructure = {
    preset: string;
    tournamentLength: number;
    roundLength: number;
    smallestDenomination: number;
    startingStack: number;
    blinds: number[][];
};