import { formatCurrency } from "../helpers/format";
import { useBlindStructure } from "../hooks/useBlindStructure";
import Table from "./Table";

type BlindsTableProps = {
    playerCount: number;
    roundLength: number;
    tournamentLength: number;
    startingStack: number;
};

function BlindsTable({
    playerCount,
    tournamentLength,
    roundLength,
    startingStack,
}: BlindsTableProps) {
    const levelCount = Math.ceil(tournamentLength / (roundLength / 60));

    const structure = useBlindStructure({
        roundLength,
        startingStack,
        playerCount,
    });

    const timeFormatted = (minutes: number) => {
        let hoursStr: string = `${Math.floor(minutes / 60)}`;
        let minutesStr: string = `${minutes % 60}`;
        if (minutesStr.length < 2) minutesStr = "0" + minutesStr;
        return hoursStr + ":" + minutesStr;
    };

    const data = Array.from(
        Array(Math.floor(structure.blinds.length)).keys()
    ).map((level) => {
        return [
            level + 1,
            structure.blinds[level][0],
            structure.blinds[level][1],
            roundLength * level,
        ];
    });

    function afterTargetTimeStyles(_: number, row: number) {
        return row > levelCount ? "text-gray-500" : "";
    }

    return (
        <Table
            headers={["Level", "Small Blind", "Big Blind", "Time"]}
            data={data}
            config={{
                headerAlignment: ["center", "right", "right", "right"],
                dataAlignment: ["center", "right", "right", "right"],
                dataFormatter: [
                    undefined,
                    (val: number) => formatCurrency(val, 0),
                    (val: number) => formatCurrency(val, 0),
                    timeFormatted,
                ],
                dataStyler: [
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
