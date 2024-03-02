
export function formatCurrency(value: number, decimals: number = 2): string {
    return value.toLocaleString("en-US", {style: "currency", currency: "USD", maximumFractionDigits: decimals});
}

export function formatPercent(value: number): string {
    return value.toLocaleString("en-US", {
        style: "percent",
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
    });
}