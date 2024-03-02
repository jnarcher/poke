import { PropsWithChildren, useState } from "react";
import { TournamentContext, TournamentContextType } from "../contexts/TournamentContext";

type TournamentProviderProps = PropsWithChildren;

function TournamentProvider({children}: TournamentProviderProps) {
    const [playerCount, setPlayerCount] = useState<number>(10);

    const value: TournamentContextType = {
        playerCount,
        setPlayerCount,
    };

    return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
}

export default TournamentProvider