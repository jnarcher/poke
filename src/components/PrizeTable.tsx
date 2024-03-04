import { formatCurrency, formatPercent } from "../helpers/format";
import Table from "./Table";
import { clamp, sequentialArray } from "../helpers/helpers";

const MIN_ROWS_TO_SHOW = 6;

export type PrizeTableProps = {
    playerCount: number;
    buyIn: number;
    rebuyCount?: number;
    percentages: number[];
    payoutCount: number;
    showTotal?: boolean;
}

function PrizeTable({playerCount, buyIn, rebuyCount, percentages, payoutCount, showTotal = true} : PrizeTableProps) {
    const totalPayout = (playerCount + (rebuyCount ?? 0)) * buyIn;
    const tableData = sequentialArray(
        clamp(
            playerCount,
            payoutCount,
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
            footer={showTotal ? [
                "TOTAL",
                formatPercent(reducePercentages()),
                `${formatCurrency(totalPayout)}`,
            ] : []}
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
