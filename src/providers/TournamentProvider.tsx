import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getNearestPayoutCount } from "../helpers/payouts";

export type TournamentContextType = {
    state: TournamentData;
    setPlayerCount: (count: number) => void;
    setBuyIn: (amount: number) => void;
    setRebuys: (amount: number) => void;
    setPayoutCount: (count: number) => void;
    setPayoutPercentages: (percentages: number[]) => void;
    setBlindPreset: (name: string) => void;
    setTournamentLength: (hours: number) => void;
    setRoundLength: (minutes: number) => void;
    setSmallestDenomination: (amount: number) => void;
    setStartingStack: (amount: number) => void;
    setBlinds: (blinds: number[][]) => void;
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
    const [playerCount, setPlayerCount] = useState<number>(0);
    const [buyIn, setBuyIn] = useState<number>(0);
    const [rebuys, setRebuys] = useState<number>(0);

    const [payoutCount, setPayoutCount] = useState<number>(1);
    const [payoutPercentages, setPayoutPercentages] = useState<number[]>([]);
    const [totalPayout, setTotalPayout] = useState<number>(0);

    const [blindPreset, setBlindPreset] = useState<string>("custom");
    const [tournamentLength, setTournamentLength] = useState<number>(0);
    const [roundLength, setRoundLength] = useState<number>(0);
    const [smallestDenomination, setSmallestDenomination] = useState<number>(0);
    const [startingStack, setStartingStack] = useState<number>(0);
    const [blinds, setBlinds] = useState<number[][]>([[]]);

    useEffect(() => {
        setTotalPayout(buyIn * (playerCount + rebuys));
    }, [playerCount, buyIn, rebuys])

    const payoutStructure: PayoutStructure = {
        count: payoutCount,
        percentages: payoutPercentages,
        total: totalPayout,
    };

    const blindStructure: BlindStructure = {
        preset: blindPreset,
        tournamentLength,
        roundLength,
        smallestDenomination,
        startingStack,
        blinds,
    }

    const tournamentData: TournamentData = {
        playerCount,
        buyIn,
        rebuys,
        payoutStructure,
        blindStructure,
    };

    const value: TournamentContextType = {
        state: tournamentData,
        setPlayerCount: (count: number) => {
            setPlayerCount(count);
        },
        setBuyIn: (amount: number) => {
            setBuyIn(amount);
        },
        setRebuys: (amount: number) => {
            setRebuys(amount);
        },
        setPayoutCount: (amount: number) => {
            setPayoutCount(getNearestPayoutCount(amount))
        },
        setPayoutPercentages: (percentages: number[]) => {
            setPayoutPercentages(percentages);
        },
        setBlindPreset: (name: string) => {
            setBlindPreset(name);
        },
        setTournamentLength: (hours: number) => {
            setTournamentLength(hours);
        },
        setRoundLength: (minutes: number) => {
            setRoundLength(minutes);
        },
        setSmallestDenomination: (amount: number) => {
            setSmallestDenomination(amount);
        },
        setStartingStack: (amount: number) => {
            setStartingStack(amount);
        },
        setBlinds: (blinds: number[][]) => {
            setBlinds(blinds);
        },
    };

    return (
        <TournamentContext.Provider value={value}>
            {children}
        </TournamentContext.Provider>
    );
}

export default TournamentProvider;
