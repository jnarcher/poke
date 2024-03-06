import BlindLevelCountdown from "../components/BlindLevelCountdown";
import InGameInfo from "../components/InGameInfo";
import PayoutDisplay from "../components/PayoutDisplay";
import PlayerInfoCard from "../components/PlayerInfoCard";
import { sequentialArray } from "../helpers/helpers";
import { useTournament } from "../providers/TournamentProvider";

function InGame() {
    const {state} = useTournament();

    return (
        <div className="flex gap-5 w-full h-full">
            <div className="flex flex-col justify-between gap-5 w-3/4 h-full">
                <div className="relative bg-neutral-900 rounded-md w-full min-h-10 overflow-hidden">
                    <div className="top-0 left-0 z-50 absolute inset-overlay-shadow w-full h-full pointer-events-none"></div>
                    <div className="flex gap-10 bg-neutral-900 p-5 rounded-md w-full overflow-x-scroll">
                        {sequentialArray(state.playerCount).map((val) => <PlayerInfoCard key={val} name={(val + 1).toString()} eliminated={val % 2 === 0}/>)}
                    </div>
                </div>
                <div className="flex-grow overflow-hidden">
                    <BlindLevelCountdown />
                </div>
                <div className="w-full min-h-10 transition-all overflow-hidden">
                    <InGameInfo />
                </div>
            </div>
            <div className="w-1/4 h-full overflow-hidden">
                <PayoutDisplay />
            </div>
        </div>
    );
}

export default InGame;
