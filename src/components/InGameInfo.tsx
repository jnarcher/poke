import { formatCurrency } from "../helpers/format";
import { useTournament } from "../providers/TournamentProvider";

function InGameInfo() {
    const { state } = useTournament();

    const getTotalChipPool = () => {
        return (
            state.blindStructure.startingStack *
            (state.playerCount + state.rebuys)
        );
    };

    const getAverageStack = () => {
        return getTotalChipPool() / state.playersRemaining;
    };

    return (
        <div className="flex justify-between gap-5 w-full h-full">
            <div className="bg-neutral-900 p-8 rounded-md w-full min-w-96 h-full">
                <h2 className="mb-5 text-3xl text-neutral-500">Round</h2>
                <span className="font-mono text-6xl">
                    {state.onBreak ? "Break" : state.currentRound + 1}
                </span>
            </div>
            <div className="bg-neutral-900 p-8 rounded-md w-full min-w-96 h-full overflow-hidden">
                <h2 className="mb-5 text-3xl text-neutral-500">Total Chips</h2>
                <span className="font-mono text-6xl">
                    {formatCurrency(getTotalChipPool(), 0)}
                </span>
            </div>
            <div className="bg-neutral-900 p-8 rounded-md w-full min-w-96 h-full">
                <h2 className="mb-5 text-3xl text-neutral-500">
                    Average Stack
                </h2>
                <span className="font-mono text-6xl">
                    {formatCurrency(getAverageStack(), 0)}
                </span>
            </div>
            <div className="bg-neutral-900 p-8 rounded-md w-full min-w-96 h-full">
                <h2 className="mb-5 text-3xl text-neutral-500">
                    Players Remaining
                </h2>
                <span className="font-mono text-6xl">
                    {state.playersRemaining}/{state.playerCount}
                </span>
            </div>
        </div>
    );
}

export default InGameInfo;
