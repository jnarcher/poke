import BlindLevelCountdown from "../components/BlindLevelCountdown";
import PayoutDisplay from "../components/PayoutDisplay";

function InGame() {
    return (
        <div className="flex gap-5 w-full h-full">
            <div className="flex flex-col gap-5 w-3/4 h-full">
                <div className="flex-1 bg-neutral-900 p-10 rounded-md w-full">
                </div>
                <div className="flex-1">
                    <BlindLevelCountdown />
                </div>
                <div className="flex-1 bg-neutral-900 p-10 rounded-md w-full">
                </div>
            </div>
            <div className="w-1/4 h-full">
                <PayoutDisplay />
            </div>
        </div>
    );
}

export default InGame;
