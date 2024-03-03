declare type TournamentData = {
    playerCount: number;
    buyIn: number;
    rebuys: number;
    payoutStructure: PayoutStructure;
}

declare type PayoutStructure = {
    total: number;
    count: number;
    percentages: number[];
}