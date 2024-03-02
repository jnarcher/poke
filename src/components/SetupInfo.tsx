import { FormEvent, useEffect, useRef, useState } from "react";
import Input from "./Input/Input";
import PrizeTable from "./PrizeTable";
import { useTournament } from "../hooks/useTournament";

function SetupInfo() {
    const playersRef = useRef<HTMLInputElement>(null);
    const buyInRef = useRef<HTMLInputElement>(null);
    const payoutsRef = useRef<HTMLInputElement>(null);
    const [buyIn, setBuyIn] = useState<number>(20);
    const [payouts, setPayouts] = useState<number>(3);
    const [prizePool, setPrizePool] = useState<number>(0);

    const {playerCount, setPlayerCount } = useTournament();

    useEffect(() => {
        updateValues();
    }, []);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateValues();
    }

    function updateValues() {
        if (playersRef.current)
            setPlayerCount(Number(playersRef.current.value));
        if (buyInRef.current)
            setBuyIn(Number(buyInRef.current.value));
        if (payoutsRef.current)
            setPayouts(Number(payoutsRef.current.value));

        updatePrizePool();
    }

    function updatePrizePool() {
        const buyIn = Number(buyInRef.current?.value);
        const players = Number(playersRef.current?.value);
        setPrizePool(calculatePrizePool(buyIn, players, 0));
    }

    return (
        <div className="flex flex-col bg-neutral-900 p-7 rounded-lg">
            <h1 className="mb-5 font-bold text-3xl italic self-center">
                TOURNAMENT INFO
            </h1>
            <div className="flex justify-around gap-5">
                <div className="flex-1">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <div>
                            <div className="opacity-60 mb-2 w-28">Players</div>
                            <Input type="count" defaultValue={playerCount.toString()} inputRef={playersRef} />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2 w-28">Buy-in</div>
                            <Input type="currency" defaultValue={buyIn.toString()} inputRef={buyInRef} />
                        </div>

                        <div>
                            <div className="opacity-60 mb-2 w-28">Payouts</div>
                            <Input type="count" defaultValue={payouts.toString()} inputRef={payoutsRef} />
                        </div>
                        <button
                            className="active:brightness-110 bg-neutral-500 mt-5 px-5 py-2 rounded-md font-bold transition-all hover:-translate-y-0.5 active:-translate-y-0 self-center hover:scale-105 active:scale-100"
                            type="submit"
                        >
                            Generate Payouts
                        </button>
                    </form>
                </div>
                <div className="flex-grow max-w-7xl">
                    <PrizeTable
                        total={prizePool}
                        payouts={Math.max(1, payouts)}
                        players={playerCount}
                    />
                </div>
            </div>
        </div>
    );
}

function calculatePrizePool(buyIn: number, numPlayers: number, rebuys:number) : number {
    return Number(buyIn) * (Number(numPlayers) + Number(rebuys));
}

export default SetupInfo;
