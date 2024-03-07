import BlindLevelCountdown from "../components/BlindLevelCountdown";
import InGameInfo from "../components/InGameInfo";
import PayoutDisplay from "../components/PayoutDisplay";
import PlayerInfoCard from "../components/PlayerInfoCard";
import { sequentialArray } from "../helpers/helpers";
import { useTournament } from "../providers/TournamentProvider";

function InGame() {
    const { state } = useTournament();

    return (
        <div className="flex gap-5 w-full h-full">
            <div className="flex flex-col justify-between gap-5 w-3/4 h-full">
                <div className="w-full min-h-10 transition-all overflow-hidden">
                    <InGameInfo />
                </div>
                <div className="overflow-hidden">
                    <BlindLevelCountdown />
                </div>
                <div className="relative flex-grow rounded-md w-full overflow-hidden">
                    <div className="flex gap-5 h-full overflow-x-scroll">
                        {sequentialArray(state.playerCount).map((val) => (
                            <PlayerInfoCard key={val} name={(1 + val).toString()} eliminated/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-full overflow-hidden">
                <PayoutDisplay />
            </div>
        </div>
    );
}

export default InGame;
