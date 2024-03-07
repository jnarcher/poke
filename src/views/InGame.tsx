import BlindLevelCountdown from "../components/BlindLevelCountdown";
import InGameInfo from "../components/InGameInfo";
import PayoutDisplay from "../components/PayoutDisplay";

function InGame() {

    return (
        <div className="flex gap-5 w-full h-full">
            <div className="flex flex-col justify-between gap-5 w-3/4 h-full">
                <div className="relative bg-neutral-900 rounded-md w-full min-h-10 overflow-hidden">
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
