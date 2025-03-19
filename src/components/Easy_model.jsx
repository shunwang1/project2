import "../Battleship.css";
import Board from "./Board";
import ShipSelection from "./ShipSelection";
import GameStatus from "./GameStatus";
import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { GAME_STATES, GAME_MODES } from "../constants/gameConstants";

function EasyModel() {
    const { initializeComputerShips, setGameState, setMessage, startTimer, setGameMode } = useGame();

    useEffect(() => {
        setGameMode(GAME_MODES.EASY);
        initializeComputerShips();
        setGameState(GAME_STATES.PLAYING);
        setMessage("Game started! Click on the computer's board to attack");
        startTimer();
    }, []); 

    return (
        <div className="max-w-6xl mx-auto bg-blue-50 p-8">
            <h1 className="text-3xl font-bold text-center mb-4">Battleship Game</h1>
            
            <GameStatus />
            <ShipSelection />

            <div className="flex flex-col md:flex-row gap-8 justify-center">
                <Board isPlayer={false} />
            </div>
        </div>
    );
}

export default EasyModel;