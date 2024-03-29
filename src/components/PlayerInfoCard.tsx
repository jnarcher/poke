import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsXCircle } from "react-icons/bs";

type Props = {
    name?: string;
    eliminated?: boolean;
};

function PlayerInfoCard({ name, eliminated }: Props) {
    const [rebuyCount, setRebuyCount] = useState<string>("0");

    const [cardHover, setCardHover] = useState<boolean>(false);
    const [eliminateButtonHover, setEliminateButtonHover] =
        useState<boolean>(false);

    useEffect(() => {
        handleRebuyChange(Number(rebuyCount));
    }, [rebuyCount]);

    function handleRebuyChange(val: number) {
        setRebuyCount(val.toString());
    }

    return (
        <div
            className={`bg-neutral-900 shadow-lg p-5 rounded-md min-w-72 h-full ${
                eliminated ? "opacity-20" : "opacity-100"
            }`}
            onMouseEnter={() => setCardHover(true)}
            onMouseLeave={() => setCardHover(false)}
        >
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl">Player {name}</h2>
                <button
                    className={`transition-all ${
                        cardHover ? "opacity-30 scale-100" : "opacity-0 scale-0"
                    }`}
                    onMouseEnter={() => setEliminateButtonHover(true)}
                    onMouseLeave={() => setEliminateButtonHover(false)}
                >
                    <IconContext.Provider
                        value={{
                            color: eliminateButtonHover ? "pink" : "white",
                        }}
                    >
                        <BsXCircle size={30} />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default PlayerInfoCard;
