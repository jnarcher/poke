import { BsChevronLeft, BsFillSuitSpadeFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const notInRoot = location.pathname !== "/";

    return (
        <div className="z-50 fixed flex items-center bg-neutral-900 shadow-2xl mb-5 p-4 w-full">
            {notInRoot && (
                <button
                    onClick={() => navigate(-1)}
                    className="hover:brightness-125 absolute bg-neutral-800 p-2 rounded-md"
                >
                    <BsChevronLeft size={15} />
                </button>
            )}
            <div className={`transition-all ${notInRoot ? "translate-x-10 ml-2" : "ml-0"}`}>
                <BsFillSuitSpadeFill size={25} />
            </div>
            <div className={`transition-all ${notInRoot ? "translate-x-10" : ""} ml-5 font-bold text-3xl italic`}>
                POKER TOURNAMENT TRACKER
            </div>
        </div>
    );
}

export default Navbar;
