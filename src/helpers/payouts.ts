import { payoutTables } from "../data/payoutTables";

export function getNearestPayoutCount(payouts: number): number {
    const filtered = payoutTables[0].structures.filter(
        (val) => val.payouts == payouts
    );
    if (filtered.length === 0) {
        console.warn(
            "No prize distribution for this number of payouts. Finding the nearest distribution."
        );
        for (let i = 0; i < payoutTables[0].structures.length; i++) {
            const entry = payoutTables[0].structures[i];
            if (entry.payouts > payouts) return entry.payouts;
        }
    } else return payouts;

    throw new Error("Unable to get nearest payoutCount for given table");
}

export function getPercentages(payouts: number): number[] {
    return payoutTables[0].structures.filter(
        (structure) => structure.payouts === payouts
    )[0].percentages;
}
