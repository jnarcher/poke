import { BsFillSuitSpadeFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="z-50 fixed flex items-center bg-neutral-900 shadow-2xl shadow-black mb-5 p-4 w-full">
            <div className="mr-5">
                <BsFillSuitSpadeFill size={25} />
            </div>
            <div className="font-bold text-3xl italic">
                POKER TOURNAMENT TRACKER
            </div>
            { location.pathname !== "/" &&
                <button onClick={() => navigate(-1)} className="hover:brightness-125 bg-neutral-800 ml-10 p-2 rounded-md">
                    BACK
                </button>
            }
        </div>
    );
}

export default Navbar;
