import { formatCurrency } from "../helpers/format";
import { sequentialArray } from "../helpers/helpers";
import Table from "./Table";

type BlindsTableProps = {
    blindStructure: BlindStructure;
};

function BlindsTable({ blindStructure }: BlindsTableProps) {
    const timeFormatted = (minutes: number) => {
        let hoursStr: string = `${Math.floor(minutes / 60)}`;
        let minutesStr: string = `${minutes % 60}`;
        if (minutesStr.length < 2) minutesStr = "0" + minutesStr;
        return hoursStr + ":" + minutesStr;
    };

    const blinds = blindStructure.structure;
    let tableData = sequentialArray(Math.floor(blinds.length)).map((level) => {
        return [
            level + 1,
            blinds[level][0],
            blinds[level][1],
            blinds[level][2],
            blindStructure.roundLength * level,
        ];
    });

    function afterTargetTimeStyles(_: number, row: number) {
        if (tableData[row][0] === -1) return "font-bold italic";
        return row >
            Math.ceil(
                blindStructure.tournamentLength /
                    (blindStructure.roundLength / 60)
            )
            ? "text-gray-500"
            : "";
    }

    return (
        <Table
            headers={["Level", "Small Blind", "Big Blind", "Ante", "Time"]}
            data={tableData}
            breakData={blindStructure.restBreaks}
            config={{
                headerAlignment: [
                    "text-center",
                    "text-right",
                    "text-right",
                    "text-right",
                    "text-right",
                ],
                dataAlignment: [
                    "text-center",
                    "text-right",
                    "text-right",
                    "text-right",
                    "text-right",
                ],
                dataFormatter: [
                    undefined,
                    (val: number) => formatCurrency(val, 0),
                    (val: number) => formatCurrency(val, 0),
                    (val: number) => (val === 0 ? "-" : val.toString()),
                    timeFormatted,
                ],
                dataStyler: [
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                ],
            }}
        />
    );
}

export default BlindsTable;
