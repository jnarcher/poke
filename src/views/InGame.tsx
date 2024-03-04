import { useNavigate } from "react-router-dom";
import BlindLevelCountdown from "../components/BlindLevelCountdown";
import PayoutDisplay from "../components/PayoutDisplay";

function InGame() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-5 h-full">
            <PayoutDisplay />
            <BlindLevelCountdown />
            <div className="flex justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="bg-sky-600 hover:bg-red-600 mx-5 mt-10 p-2 rounded-md w-32 hover:scale-105 active:scale-100 font-bold text-lg italic transition-all"
                >
                    BACK
                </button>
            </div>
        </div>
    );
}

export default InGame;
