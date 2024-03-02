type TableProps = {
    headers: string[];
    data: (string | number)[][];
    footer?: string[];
};
function Table({ headers, data, footer }: TableProps) {
    return <table>
        <thead>

        </thead>
    </table>;
}
export default Table;
