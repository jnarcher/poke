import { Input } from "postcss";
import { formatCurrency } from "../helpers/format";
import { sequentialArray } from "../helpers/helpers";
import { useTournament } from "../providers/TournamentProvider";
import PrizeTable from "./PrizeTable";

export function PayoutDisplay() {
    const { state } = useTournament();

    const tableData = sequentialArray(state.playerCount).map((place) => [
        place + 1,
        state.payoutStructure.percentages[place] / 100,
        (state.payoutStructure.percentages[place] *
            state.payoutStructure.total) /
        100,
    ]);

    return (
        <div className="flex flex-col justify-start items-center gap-10 bg-neutral-900 p-10 rounded-lg w-full">
            <h2 className="font-bold text-4xl italic">PAYOUTS</h2>
            <div className="w-full">
                <PrizeTable
                    playerCount={state.playerCount}
                    buyIn={state.buyIn}
                    percentages={state.payoutStructure.percentages}
                    payoutCount={state.payoutStructure.count}
                    showTotal={false} />
                {/* <Table
                headers={["PLACE", "%", "$"]}
                data={tableData}
                config={{
                    headerAlignment: [
                        "text-center",
                        "text-right",
                        "text-right",
                    ],
                    dataAlignment: [
                        "text-center",
                        "text-right",
                        "text-right",
                    ],
                    dataFormatter: [
                        undefined,
                        formatPercent,
                        formatCurrency,
                    ],
                }}
            /> */}
            </div>
            <div>
                <span>Re-Buys</span>
                <Input />
            </div>
            <div className="flex gap-10 text-4xl">
                <div className="text-neutral-400">TOTAL:</div>
                <div className="font-mono">
                    {formatCurrency(state.payoutStructure.total)}
                </div>
            </div>
        </div>
    );
}
