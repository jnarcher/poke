export const blindStructures: BlindStructure[] = [
    {
        preset: "shortstack-4hr/15min",
        playerCount: 8,
        tournamentLength: 4,
        smallestDenomination: 25,
        roundLength: 15,
        startingStack: 5000,
        structure: [
            [25, 50, 0],
            [50, 100, 0],
            [75, 150, 0],
            [100, 200, 0],
            [125, 250, 0],
            [150, 300, 0],
            [175, 350, 0],
            [200, 400, 0],
            [300, 600, 0],
            [400, 800, 0],
            [500, 1000, 0],
            [600, 1200, 0],
            [700, 1400, 0],
            [800, 1600, 0],
            [900, 1800, 0],
            [1000, 2000, 0],
            [1500, 3000, 0],
            [2000, 4000, 0],
            [3000, 6000, 0],
            [4000, 8000, 0],
            [5000, 10000, 0],
        ],
        restBreaks: [
            { minutesIn: 60, breakLength: 5 },
            { minutesIn: 180, breakLength: 10 },
            { minutesIn: 240, breakLength: 15 },
        ],
    },
    {
        preset: "shortstack-4hr/20min",
        playerCount: 8,
        tournamentLength: 4,
        smallestDenomination: 25,
        roundLength: 20,
        startingStack: 5000,
        structure: [
            [25, 50, 0],
            [50, 100, 0],
            [75, 150, 0],
            [100, 200, 0],
            [125, 250, 0],
            [150, 300, 0],
            [200, 400, 0],
            [300, 600, 0],
            [400, 800, 0],
            [500, 1000, 0],
            [600, 1200, 0],
            [700, 1400, 0],
            [1000, 2000, 0],
            [1500, 3000, 0],
            [2000, 4000, 0],
            [3000, 6000, 0],
            [4000, 8000, 0],
            [5000, 10000, 0],
        ],
        restBreaks: [
            { minutesIn: 60, breakLength: 5 },
            { minutesIn: 180, breakLength: 10 },
            { minutesIn: 240, breakLength: 15 },
        ],
    },
];
