import { useNavigate } from "react-router-dom";
import SetupBlindStructure from "../components/SetupBlindStructure";
import SetupInfo from "../components/SetupInfo";

function Setup() {
    const navigate = useNavigate();
    function handleBeginTournament() {
        navigate("/tournament");
    }

    return (
        <div className="flex flex-col text-white">
            <div className="flex flex-col gap-5">
                <div className="flex-1">
                    <SetupInfo />
                </div>
                <div className="flex-1">
                    <SetupBlindStructure />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleBeginTournament}
                    className="bg-blue-500 hover:bg-green-600 mx-5 mt-5 p-5 rounded-md w-4/5 max-w-3xl hover:scale-105 active:scale-100 font-bold text-3xl italic transition-all"
                >
                    BEGIN TOURNAMENT
                </button>
            </div>
        </div>
    );
}

export default Setup;
