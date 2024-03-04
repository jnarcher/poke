import { BsFillSuitSpadeFill } from "react-icons/bs";

function Navbar() {
    return (
        <div className="z-50 fixed flex items-center bg-neutral-900 mb-5 p-4 w-full">
            <div className="mr-5">
                <BsFillSuitSpadeFill size={25} />
            </div>
            <div className="font-bold text-3xl italic">
                POKER TOURNAMENT TRACKER
            </div>
        </div>
    );
}

export default Navbar;
