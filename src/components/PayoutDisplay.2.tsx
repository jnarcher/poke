import { formatCurrency } from "../helpers/format";
import { useTournament } from "../providers/TournamentProvider";
import PrizeTable from "./PrizeTable";
import BlindsTable from "./BlindsTable";

export function PayoutDisplay() {
    const { state } = useTournament();

    return (
        <div className="flex flex-col justify-between gap-5 bg-neutral-900 p-10 pt-5 rounded-lg h-full overflow-scroll-y">
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h2 className="flex h-full font-bold text-4xl italic">
                        <span>PAYOUTS</span>
                    </h2>
                    <div className="flex flex-col gap-1">
                        <div className="text-right text-neutral-600 text-xl">
                            TOTAL
                        </div>
                        <div className="text-right font-mono text-5xl">
                            {formatCurrency(state.payoutStructure.total)}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <PrizeTable
                        playerCount={state.playerCount}
                        buyIn={state.buyIn}
                        rebuyCount={state.rebuys}
                        percentages={state.payoutStructure.percentages}
                        payoutCount={state.payoutStructure.count}
                        showTotal={false} />
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // handleRebuyChange(Number(rebuyCount));
                    }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="flex justify-between items-center w-full">
                        <span className="w-24 text-2xl text-neutral-400">
                            Re-Buys
                        </span>
                        <div className="flex items-center">
                            <button
                                className="text-2xl active:-translate-x-1 rotate-180"
                            >
                                <BsCaretRightFill />
                            </button>
                            <input
                                type="number"
                                placeholder="-"
                                value={rebuyCount}
                                onChange={(e) => setRebuyCount(e.target.value)}
                                onBlur={() => handleRebuyChange(Number(rebuyCount))}
                                className={`transition-all ${cardHover
                                        ? "bg-opacity-100"
                                        : "bg-opacity-0"} bg-neutral-700 p-1 rounded-xl w-14 text-2xl text-center`} />
                            <button
                                className={`transition-all ${cardHover ? "opacity-100" : "opacity-0"} text-2xl active:translate-x-1`}
                                onClick={() => handleRebuyChange(Number(rebuyCount) + 1)}
                            >
                                <BsCaretRightFill />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h2 className="mb-4 font-bold text-4xl italic">BLINDS</h2>
                <div className="w-full">
                    <BlindsTable
                        blindStructure={state.blindStructure}
                        smallHeaders
                        focus={{
                            rowIdx: state.currentRound,
                            rowsAround: 5,
                        }} />
                </div>
            </div>
        </div>
    );
}
