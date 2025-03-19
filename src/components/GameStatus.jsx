import { useGame } from '../context/GameContext';
import { GAME_STATES } from '../constants/gameConstants';

function GameStatus() {
    const { 
        gameState, 
        message, 
        winner, 
        gameTime, 
        formatTime, 
        resetGame
    } = useGame();

    return (
        <div>
            <div className="mb-4 text-center bg-yellow-100 p-4 rounded">
                <p className="text-lg">{message}</p>
                {gameState !== GAME_STATES.SETUP && (
                    <div className="mt-2">
                        <p className="text-lg">Game Time: {formatTime(gameTime)}</p>
                        <button 
                            onClick={resetGame}
                            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded font-bold hover:bg-orange-600"
                        >
                            Reset Game
                        </button>
                    </div>
                )}
            </div>
            
            {gameState === GAME_STATES.GAME_OVER && (
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        {winner === 'player' ? 'You Won! 🎉' : 'Computer Won! 😢'}
                    </h2>
                    <p className="mb-4">Total Time: {formatTime(gameTime)}</p>
                    <button 
                        onClick={resetGame}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default GameStatus; 