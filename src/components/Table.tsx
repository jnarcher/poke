import { Fragment } from "react/jsx-runtime";
import "../assets/css/table.css";

type TableProps = {
    headers?: string[];
    data?: (string | number)[][];
    breakData?: RestBreak[];
    rowHighlight?: number;
    footer?: string[];
    config?: TableConfig;
};

export type TableConfig = {
    headerAlignment?: (
        | "text-left"
        | "text-center"
        | "text-right"
        | undefined
    )[];
    dataAlignment?: ("text-left" | "text-center" | "text-right" | undefined)[];
    footerAlignment?: (
        | "text-left"
        | "text-center"
        | "text-right"
        | undefined
    )[];
    dataFormatter?: any[];
    dataStyler?: any[];
};

function Table({
    headers,
    data,
    breakData,
    rowHighlight,
    footer,
    config,
}: TableProps) {
    function isBreakRow(row: (string | number)[]): boolean {
        if (!breakData || !data) return false;
        return (
            breakData.filter((bData) => bData.minutesIn === row[row.length - 1])
                .length !== 0
        );
    }

    function getBreakLength(row: (string | number)[]): number {
        if (!breakData || !data) return 0;
        return breakData.filter(
            (bData) => bData.minutesIn === row[row.length - 1]
        )[0].breakLength;
    }

    return (
        <div className="flex justify-center shadow-lg py-2 rounded-md text-xl outline outline-neutral-700">
            <table className="flex-1">
                {headers && (
                    <thead>
                        <tr>
                            {headers.map((val, idx) => (
                                <th
                                    key={idx}
                                    className={
                                        config?.headerAlignment
                                            ? config.headerAlignment[idx]
                                            : "text-left"
                                    }
                                >
                                    {val}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                {data && (
                    <tbody>
                        {data.map((row, rowIdx) => (
                            <Fragment key={rowIdx}>
                                {isBreakRow(row) && (
                                    <tr className="bg-slate-700">
                                        <td
                                            colSpan={row.length}
                                            className="py-1 font-mono text-center"
                                        >
                                            {getBreakLength(row) +
                                                " minute break"}
                                        </td>
                                    </tr>
                                )}
                                <tr
                                    className={
                                        Number(row[0]) - 1 === rowHighlight 
                                            ? "bg-neutral-700"
                                            : `${
                                                  rowIdx % 2 === 0 && config
                                                      ? "bg-neutral-700"
                                                      : "bg-neutral-800"
                                              } bg-opacity-15`
                                    }
                                >
                                    {row.map((val, idx) => (
                                        <td
                                            key={idx}
                                            className={`font-mono ${
                                                config?.dataAlignment
                                                    ? config.dataAlignment[idx]
                                                    : ""
                                            } ${
                                                config?.dataStyler
                                                    ? config.dataStyler[idx] !==
                                                      undefined
                                                        ? config.dataStyler[
                                                              idx
                                                          ](val, rowIdx)
                                                        : ""
                                                    : ""
                                            } ${Number(row[0]) - 1 === rowHighlight ? "py-3 text-2xl" : "py-2"}`}
                                        >
                                            {config?.dataFormatter
                                                ? config.dataFormatter[idx] !==
                                                  undefined
                                                    ? config.dataFormatter[idx](
                                                          val
                                                      )
                                                    : val
                                                : val}
                                        </td>
                                    ))}
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                )}
                {footer && (
                    <tfoot>
                        <tr>
                            {footer.map((val, idx) => (
                                <td
                                    key={idx}
                                    className={
                                        config?.footerAlignment
                                            ? config.footerAlignment[idx]
                                            : "text-left"
                                    }
                                >
                                    {val}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}

export default Table;
