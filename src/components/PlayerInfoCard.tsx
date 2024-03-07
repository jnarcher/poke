import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BsCaretRightFill, BsXCircle } from "react-icons/bs";

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
            className={`bg-neutral-800 shadow-lg p-5 rounded-md min-w-72 h-full ${
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
            <div className="flex flex-wrap justify-between items-center gap-10 w-full">
                <div className="flex items-center w-full">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRebuyChange(Number(rebuyCount));
                        }}
                        className="flex flex-col items-center gap-8 w-full"
                    >
                        <div className="flex justify-between items-center w-full">
                            <span className="w-24 text-2xl text-neutral-400">
                                Re-Buys
                            </span>
                            <div className="flex items-center">
                                <button
                                    className={`transition-all ${
                                        cardHover ? "opacity-100" : "opacity-0"
                                    } text-2xl active:-translate-x-1 rotate-180`}
                                    onClick={() =>
                                        handleRebuyChange(
                                            Number(rebuyCount) - 1
                                        )
                                    }
                                >
                                    <BsCaretRightFill />
                                </button>
                                <input
                                    type="number"
                                    placeholder="-"
                                    value={rebuyCount}
                                    onChange={(e) =>
                                        setRebuyCount(e.target.value)
                                    }
                                    onBlur={() =>
                                        handleRebuyChange(Number(rebuyCount))
                                    }
                                    className={`transition-all ${
                                        cardHover
                                            ? "bg-opacity-100"
                                            : "bg-opacity-0"
                                    } bg-neutral-700 p-1 rounded-xl w-14 text-2xl text-center`}
                                />
                                <button
                                    className={`transition-all ${
                                        cardHover ? "opacity-100" : "opacity-0"
                                    } text-2xl active:translate-x-1`}
                                    onClick={() =>
                                        handleRebuyChange(
                                            Number(rebuyCount) + 1
                                        )
                                    }
                                >
                                    <BsCaretRightFill />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PlayerInfoCard;
