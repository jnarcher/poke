import { formatCurrency } from "../helpers/format";
import { clamp, sequentialArray } from "../helpers/helpers";
import Table from "./Table";

type BlindsTableProps = {
    blindStructure: BlindStructure;
    smallHeaders?: boolean;
    focus?: {
        rowIdx: number;
        rowsAround: number;
    };
};

function BlindsTable({ blindStructure, focus, smallHeaders }: BlindsTableProps) {
    const timeFormatted = (minutes: number) => {
        let hoursStr: string = `${Math.floor(minutes / 60)}`;
        let minutesStr: string = `${minutes % 60}`;
        if (minutesStr.length < 2) minutesStr = "0" + minutesStr;
        return hoursStr + ":" + minutesStr;
    };

    const blinds = blindStructure.structure;

    const numRowsToDisplay = focus ? focus.rowsAround * 2 + 1 : blinds.length;
    const arrLength = focus ? clamp(numRowsToDisplay, blinds.length, 1): blinds.length;
    const arrStart = focus ? clamp(focus.rowIdx - focus.rowsAround, blinds.length - numRowsToDisplay, 0) : 0;
    const arr =  sequentialArray(arrLength, arrStart);

    let tableData = arr.map((level) => {
        return [
            level + 1,
            blinds[level][0],
            blinds[level][1],
            blinds[level][2],
            blindStructure.roundLength * level,
        ];
    });

    function afterTargetTimeStyles(_: number, row: number) {
        return row + 1 >
            Math.ceil(
                blindStructure.tournamentLength /
                    (blindStructure.roundLength / 60)
            )
            ? "text-gray-500"
            : "";
    }

    return (
        <Table
            headers={smallHeaders ? ["LEVEL", "SB", "BB", "ANTE", "TIME"] : ["Level", "Small Blind", "Big Blind", "Ante", "Time"]}
            data={tableData}
            breakData={blindStructure.restBreaks}
            rowHighlight={focus?.rowIdx}
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
