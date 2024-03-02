import { formatCurrency, formatPercent } from "../helpers/format"
import { usePayoutStructure } from "../hooks/usePayoutStructure";
import Table from "./Table";

type PrizeTableProps = {
    total: number,
    payouts: number,
    players: number,
}

const MIN_ROWS_TO_SHOW = 6;

function PrizeTable({ total, payouts, players }: PrizeTableProps) {
    const { percentages, getPlacePercentage } = usePayoutStructure(payouts);

    const data = Array.from(Array(Math.max(Math.min(players, payouts), MIN_ROWS_TO_SHOW)).keys()).map((place) => {
        const percentage = getPlacePercentage(place + 1);
        return [place + 1, percentage, percentage * total];
    })

    return (
        <Table
            headers={["PLACE", "%", "$"]}
            data={data}
            footer={[
                "TOTAL",
                formatPercent(percentages.reduce((acc, val) => acc + val)),
                `${formatCurrency(total)}`,
            ]}
            config={{
                headerAlignment: ["center", "right", "right"],
                dataAlignment: ["center", "right", "right"],
                footerAlignment: ["center", "right", "right"],
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