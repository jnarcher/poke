import { formatCurrency, formatPercent } from "../helpers/format";
import { useTournament } from "../providers/TournamentProvider";
import Table from "./Table";
import { clamp, squentialArray } from "../helpers/helpers";

const MIN_ROWS_TO_SHOW = 6;

export type PrizeTableProps = {
    playerCount: number;
    buyIn: number;
    percentages: number[];
    payouts: number;
}

function PrizeTable({playerCount, buyIn, percentages, payouts} : PrizeTableProps) {

    const totalPayout = playerCount * buyIn;

    const tableData = squentialArray(
        clamp(
            playerCount,
            payouts,
            MIN_ROWS_TO_SHOW
        )
    ).map((place) => {
        const percentage =
            place >=  percentages.length ? 0 : percentages[place];
        return [
            place + 1,
            percentage / 100,
            (percentage * totalPayout) / 100,
        ];
    });

    function reducePercentages() {
        return tableData.reduce((acc, val) => [acc[0] + val[1]], [0])[0];
    }

    return (
        <Table
            headers={["PLACE", "%", "$"]}
            data={tableData}
            footer={[
                "TOTAL",
                formatPercent(reducePercentages()),
                `${formatCurrency(totalPayout)}`,
            ]}
            config={{
                headerAlignment: ["text-center", "text-right", "text-right"],
                dataAlignment: ["text-center", "text-right", "text-right"],
                footerAlignment: ["text-center", "text-right", "text-right"],
                dataFormatter: [undefined, formatPercent, formatCurrency],
                dataStyler: [
                    undefined,
                    (n: number) => (n === 0 ? "text-gray-600" : ""),
                    (n: number) => (n === 0 ? "text-gray-600" : ""),
                ],
            }}
        />
    );
}

export default PrizeTable;
