import { getBlinds } from "../helpers/blinds";
import { formatCurrency } from "../helpers/format";
import { squentialArray } from "../helpers/helpers";
import Table from "./Table";

type BlindsTableProps = {
    presetName: string;
    roundLength: number;
    tournamentLength: number;
};

function BlindsTable({
    presetName,
    tournamentLength,
    roundLength,
}: BlindsTableProps) {
    const levelCount = Math.ceil(tournamentLength / (roundLength / 60));
    const blinds =
        presetName === "custom" ? getBlinds() : getBlinds(presetName);

    const timeFormatted = (minutes: number) => {
        let hoursStr: string = `${Math.floor(minutes / 60)}`;
        let minutesStr: string = `${minutes % 60}`;
        if (minutesStr.length < 2) minutesStr = "0" + minutesStr;
        return hoursStr + ":" + minutesStr;
    };

    const tableData = squentialArray(Math.floor(blinds.length)).map((level) => {
        return [
            level + 1,
            blinds[level][0],
            blinds[level][1],
            "-",
            roundLength * level,
        ];
    });

    function afterTargetTimeStyles(_: number, row: number) {
        return row > levelCount ? "text-gray-500" : "";
    }

    return (
        <Table
            headers={["Level", "Small Blind", "Big Blind", "Ante", "Time"]}
            data={tableData}
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
                    undefined,
                    timeFormatted,
                ],
                dataStyler: [
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                    afterTargetTimeStyles,
                    () => "text-gray-500",
                    afterTargetTimeStyles,
                ],
            }}
        />
    );
}

export default BlindsTable;
