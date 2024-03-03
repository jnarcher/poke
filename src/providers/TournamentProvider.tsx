import {
    PropsWithChildren,
    createContext,
    useContext,
    useState,
} from "react";
import { getNearestPayoutCount } from "../helpers/payouts";
import { PayoutTableType, payoutTables } from "../data/payoutTables";

export type TournamentContextType = {
    state: TournamentData;
    setPlayerCount: (count: number) => void;
    setBuyIn: (amount: number) => void;
    addRebuys: (amount: number) => void;
    changePayoutCount: (count: number) => void;
    changePayoutTable: (name: string) => void;
};

export const TournamentContext = createContext<TournamentContextType | null>(
    null
);

export function useTournament() {
    const context = useContext(TournamentContext);
    if (context === null) {
        throw new Error(
            "useTournament must be used within a TournamentProvider"
        );
    }
    return context;
}

function TournamentProvider({ children }: PropsWithChildren) {
    const [playerCount, setPlayerCount] = useState<number>(10);
    const [buyIn, setBuyIn] = useState<number>(20);
    const [rebuys, setRebuys] = useState<number>(0);

    const [payoutCount, setPayoutCount] = useState<number>(2);
    const [payoutPercentages, setPayoutPercentages] = useState<number[]>([]);
    const [totalPayout, setTotalPayout] = useState<number>(0);


    function changePayoutCount(count: number) {
        // if (payoutTable === null) {
        //     console.warn(
        //         "attempted to change payout count on null payout table, loading defaults"
        //     );
        //     return;
        // }

        // try {
        //     count = getNearestPayoutCount(count, payoutTable);
        //     console.log("payout count now: ", count);
        //     setPayoutStructure((prev) => ({
        //         ...prev,
        //         payoutCount: count,
        //     }));
        // } catch (e: any) {
        //     console.error(e);
        // }
    }

    function changePayoutTable(name: string) {
        // const tablesFiltered = payoutTables.filter(
        //     (table) => table.name === name
        // );
        // if (tablesFiltered.length === 0) {
        //     console.warn(`unable to find payout table with name: ${name}`);
        //     return;
        // }
        // console.log("table now: " + name);
        // setPayoutTable(tablesFiltered[0]);
    }

    const payoutStructure: PayoutStructure = {
        count: payoutCount,
        percentages: payoutPercentages,
        total: totalPayout,
    };

    const tournamentData: TournamentData = {
        playerCount,
        buyIn,
        rebuys,
        payoutStructure,
    };

    const value: TournamentContextType = {
        state: tournamentData,
        setPlayerCount: (count: number) => {
            setPlayerCount(count);
        },
        setBuyIn: (amount: number) => {
            setBuyIn(amount);
        },
        addRebuys: (amount: number) => {
            setRebuys((prev) => Math.max(prev + amount, 0));
        },
        changePayoutCount,
        changePayoutTable,
    };

    return (
        <TournamentContext.Provider value={value}>
            {children}
        </TournamentContext.Provider>
    );
}

export default TournamentProvider;
