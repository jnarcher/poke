import { useState } from "react";
import { formatCurrency } from "../helpers/format";
import { clamp } from "../helpers/helpers";
import { useTournament } from "../providers/TournamentProvider";
import PrizeTable from "./PrizeTable";
import { BsCaretRightFill } from "react-icons/bs";

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
        <div className="flex flex-col gap-10 bg-neutral-900 p-10 rounded-lg w-1/4">
            <h2 className="font-bold text-4xl italic">PAYOUTS</h2>
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
            <div className="flex flex-col gap-5">
                <span className="text-3xl text-neutral-400">Re-Buys</span>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleRebuyChange(Number(rebuyCount));
                    }}
                    className="flex items-center gap-2"
                >
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
                        placeholder="0"
                        value={rebuyCount}
                        onChange={(e) => setRebuyCount(e.target.value)}
                        onBlur={() => handleRebuyChange(Number(rebuyCount))}
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
                </form>
            </div>
            <div className="flex flex-col gap-5 text-3xl">
                <div className="text-neutral-400">Total Payout</div>
                <div className="font-mono">
                    {formatCurrency(state.payoutStructure.total)}
                </div>
            </div>
        </div>
    );
}

export default PayoutDisplay;
