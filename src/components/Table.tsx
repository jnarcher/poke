import "../assets/css/table.css";

type TableProps = {
    headers: string[];
    data: (string | number)[][];
    footer?: string[];
    config?: TableConfig;
};

export type TableConfig = {
    headerAlignment?: ("text-left" | "text-center" | "text-right" | undefined)[];
    dataAlignment?: ("text-left" | "text-center" | "text-right" | undefined)[];
    footerAlignment?: ("text-left" | "text-center" | "text-right" | undefined)[];
    dataFormatter?: any[];
    dataStyler?: any[];
};

function Table({headers, data, footer, config}: TableProps) {
    return (
        <div className="flex justify-center shadow-2xl shadow-black py-2 rounded-md outline outline-neutral-700">
            <table className="flex-1">
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
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr
                            key={rowIdx}
                            className={`${
                                rowIdx % 2 === 0
                                    ? "bg-neutral-700"
                                    : "bg-neutral-800"
                            } bg-opacity-15 py-1`}
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
                                                ? config.dataStyler[idx](val, rowIdx)
                                                : ""
                                            : ""
                                    }`}
                                >
                                    {config?.dataFormatter
                                        ? config.dataFormatter[idx] !==
                                          undefined
                                            ? config.dataFormatter[idx](val)
                                            : val
                                        : val}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
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

export default Table