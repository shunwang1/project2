import { useGame } from "../context/GameContext";
import { useEffect } from "react";
import { GAME_MODES } from "../constants/gameConstants";
import Board from "./Board";
import ShipSelection from "./ShipSelection";
import GameStatus from "./GameStatus";

function NormalModel() {
    const { setGameMode } = useGame();

    useEffect(() => {
        setGameMode(GAME_MODES.NORMAL);
    }, []); 

    return (
        <div className="max-w-6xl mx-auto bg-blue-50 p-8">
            <h1 className="text-3xl font-bold text-center mb-4">Battleship Game</h1>
            
            <GameStatus />
            <ShipSelection />

            <div className="flex flex-col md:flex-row gap-8 justify-center">
                <Board isPlayer={true} />
                <Board isPlayer={false} />
            </div>
        </div>
    );
}

export default NormalModel;