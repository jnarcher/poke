import { FormEvent, useEffect, useState } from "react";
import Input from "./Input/Input";
import { useTournament } from "../providers/TournamentProvider";
import PrizeTable, { PrizeTableProps } from "./PrizeTable";
import { getPercentages } from "../helpers/payouts";

function SetupPayout() {
    const {
        state,
        setPlayerCount,
        setPlayersRemaining,
        setBuyIn: setTournamentBuyIn,
        setPayoutCount,
        setPayoutPercentages,
    } = useTournament();

    const [players, setPlayers] = useState<string>(
        state.playerCount.toString()
    );
    const [buyIn, setBuyIn] = useState<string>(state.buyIn.toString());
    const [payouts, setPayouts] = useState<string>(
        state.payoutStructure.count.toString()
    );

    const [tableProps, setTableProps] = useState<PrizeTableProps>({
        percentages: [],
        playerCount: state.playerCount,
        buyIn: state.buyIn,
        payoutCount: state.payoutStructure.count,
    });

    useEffect(updateTableProps, []);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updateTableProps();
    }

    function updateTableProps() {
        const playerCount = Number(players);
        const buyInAmount = Number(buyIn);
        const payoutCount = Number(payouts);
        const percentages = getPercentages(Number(payouts));

        setPlayerCount(playerCount);
        setPlayersRemaining(playerCount);
        setTournamentBuyIn(buyInAmount);
        setPayoutCount(payoutCount);
        setPayoutPercentages(percentages);

        setTableProps({
            percentages,
            playerCount,
            buyIn: buyInAmount,
            payoutCount,
            showTotal: true,
        });
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
                            <Input
                                type="count"
                                value={players}
                                onChange={(e) => setPlayers(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="opacity-60 mb-2 w-28">Buy-in</div>
                            <Input
                                type="currency"
                                value={buyIn}
                                onChange={(e) => setBuyIn(e.target.value)}
                            />
                        </div>

                        <div>
                            <div className="opacity-60 mb-2 w-28">Payouts</div>
                            <Input
                                type="count"
                                value={payouts}
                                onChange={(e) => setPayouts(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-neutral-500 active:scale-95 mt-5 px-5 py-2 rounded-md font-bold transition-all self-center"
                            type="submit"
                        >
                            Generate Payouts
                        </button>
                    </form>
                </div>
                <div className="flex-grow max-w-7xl">
                    <PrizeTable {...tableProps} />
                </div>
            </div>
        </div>
    );
}

export default SetupPayout;
