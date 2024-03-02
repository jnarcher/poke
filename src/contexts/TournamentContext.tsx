import { createContext } from "react";

export type TournamentContextType = {
    playerCount: number;
    setPlayerCount: (val: number) => void;
};
export const TournamentContext = createContext<TournamentContextType | null>(
    null
);
