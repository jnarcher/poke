import { payoutStructure } from "../data/payoutStructure";

export function usePayoutStructure(numPayouts: number): {
    percentages: number[];
    getPlacePercentage: (p: number) => number;
} {
    const filtered = payoutStructure.filter(({payouts}) => payouts == numPayouts);
    let dist = payoutStructure[0];
    if (filtered.length === 0) {
        console.warn(
            "No prize distribution for this number of payouts. Finding the nearest distribution."
        );
        for (let i = 0; i < payoutStructure.length; i++) {
            const entry = payoutStructure[i];
            if (entry.payouts > numPayouts)
                break;

            dist = entry;
        }
    }
    else
        dist = filtered[0];
    

    function getPlacePercentage(p: number): number {
        if (p > dist.percentages.length || p < 1) return 0;
        return dist.percentages[p - 1] / 100;
    }

    return {
        percentages: dist.percentages.map(val => val / 100),
        getPlacePercentage,
    };
}