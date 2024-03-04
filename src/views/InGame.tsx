import BlindLevelCountdown from "../components/BlindLevelCountdown";
import PayoutDisplay from "../components/PayoutDisplay";

function InGame() {
    return (
        <div className="flex gap-5 w-full h-full">
                <BlindLevelCountdown />
                <PayoutDisplay />
        </div>
    );
}

export default InGame;
