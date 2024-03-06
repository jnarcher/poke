import { useState } from "react";
import { formatCurrency } from "../helpers/format";
import { clamp } from "../helpers/helpers";
import { useTournament } from "../providers/TournamentProvider";
import PrizeTable from "./PrizeTable";
import { BsCaretRightFill } from "react-icons/bs";
import BlindsTable from "./BlindsTable";

function PayoutDisplay() {
    const { state, setRebuys } = useTournament();
    const [rebuyCount, setRebuyCount] = useState<string>(
        state.rebuys.toString()
    );

    const handleRebuyChange = (amount: number) => {
        let newVal = clamp(amount, 100, 0);
        setRebuys(newVal);
        setRebuyCount(newVal.toString());
    };

    return (
        <div className="flex flex-col gap-5 bg-neutral-900 p-10 rounded-lg h-full overflow-scroll-y">
            <div className="flex justify-between items-center">
                <h2 className="flex items-end h-full font-bold text-4xl italic"><span>PAYOUTS</span></h2>
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
                    showTotal={false}
                />
            </div>
            <div className="flex flex-wrap justify-between items-center gap-10">
                {/* <div className="flex items-center">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRebuyChange(Number(rebuyCount));
                        }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-24 text-2xl text-neutral-400">
                                Re-Buys
                            </span>
                            <button
                                className="text-2xl active:-translate-x-1 rotate-180"
                                onClick={() =>
                                    handleRebuyChange(Number(rebuyCount) - 1)
                                }
                            >
                                <BsCaretRightFill />
                            </button>
                            <input
                                type="number"
                                placeholder="-"
                                value={rebuyCount}
                                onChange={(e) => setRebuyCount(e.target.value)}
                                onBlur={() =>
                                    handleRebuyChange(Number(rebuyCount))
                                }
                                className="bg-neutral-600 p-2 rounded-xl w-20 text-2xl text-center"
                            />
                            <button
                                className="text-2xl active:translate-x-1"
                                onClick={() =>
                                    handleRebuyChange(Number(rebuyCount) + 1)
                                }
                            >
                                <BsCaretRightFill />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 text-2xl text-neutral-400">
                               Add-Ons 
                            </span>
                            <button
                                className="text-2xl active:-translate-x-1 rotate-180"
                                onClick={() => {}}
                            >
                                <BsCaretRightFill />
                            </button>
                            <input
                                type="number"
                                placeholder="-"
                                onChange={() => {}}
                                onBlur={() => {}}
                                className="bg-neutral-600 p-2 rounded-xl w-20 text-2xl text-center"
                            />
                            <button
                                className="text-2xl active:translate-x-1"
                                onClick={() => {}}
                            >
                                <BsCaretRightFill />
                            </button>
                        </div>
                    </form>
                </div> */}
            </div>
            <h2 className="font-bold text-4xl italic">BLINDS</h2>
            <div className="w-full">
                <BlindsTable blindStructure={state.blindStructure} focus={{
                    rowIdx: state.currentRound,
                    rowsAround: 5,
                }}/>
            </div>
        </div>
    );
}

export default PayoutDisplay;
