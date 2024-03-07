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
    compact?: boolean;
};

function BlindsTable({
    blindStructure,
    focus,
    smallHeaders,
    compact,
}: BlindsTableProps) {
    const timeFormatted = (minutes: number) => {
        let hoursStr: string = `${Math.floor(minutes / 60)}`;
        let minutesStr: string = `${minutes % 60}`;
        if (minutesStr.length < 2) minutesStr = "0" + minutesStr;
        return hoursStr + ":" + minutesStr;
    };

    const blinds = blindStructure.structure;

    const numRowsToDisplay = focus ? focus.rowsAround * 2 + 1 : blinds.length;
    const arrLength = focus
        ? clamp(numRowsToDisplay, blinds.length, 1)
        : blinds.length;
    const arrStart = focus
        ? clamp(
              focus.rowIdx - focus.rowsAround,
              blinds.length - numRowsToDisplay,
              0
          )
        : 0;
    const arr = sequentialArray(arrLength, arrStart);

    const nonZeroAntes = blinds.filter((val) => val[2] !== 0);
    let tableData = arr.map((level) => {
        if (compact && nonZeroAntes.length === 0) {
            return [
                level + 1,
                blinds[level][0],
                blinds[level][1],
                blindStructure.roundLength * level,
            ];
        } else {
            return [
                level + 1,
                blinds[level][0],
                blinds[level][1],
                blinds[level][2],
                blindStructure.roundLength * level,
            ];
        }
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

    function getHeaders() {
        if (compact || tableData[0].length === 4) {
            return smallHeaders
                ? ["LEVEL", "SB", "BB", "TIME"]
                : ["Level", "Small Blind", "Big Blind", "Time"];
        }
        return smallHeaders
            ? ["LEVEL", "SB", "BB", "ANTE", "TIME"]
            : ["Level", "Small Blind", "Big Blind", "Ante", "Time"];
    }

    const dataFormatter =
        tableData[0].length === 4
            ? [
                  undefined,
                  (val: number) => formatCurrency(val, 0),
                  (val: number) => formatCurrency(val, 0),
                  timeFormatted,
              ]
            : [
                  undefined,
                  (val: number) => formatCurrency(val, 0),
                  (val: number) => formatCurrency(val, 0),
                  (val: number) => (val === 0 ? "-" : val.toString()),
                  timeFormatted,
              ];

    return (
        <Table
            headers={getHeaders()}
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
                dataFormatter,
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
