import Cell from './Cell';
import { useGame } from '../context/GameContext';

function Board({ isPlayer }) {
    const { playerBoard, computerBoard } = useGame();
    const board = isPlayer ? playerBoard : computerBoard;
    
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-center">
                {isPlayer ? "Your Board" : "Computer's Board"}
            </h2>
            <div className="grid grid-cols-10 gap-0">
                {board.map((row, rowIndex) => (
                    row.map((_, colIndex) => (
                        <Cell 
                            key={`${rowIndex}-${colIndex}`} 
                            row={rowIndex} 
                            col={colIndex} 
                            isPlayer={isPlayer} 
                        />
                    ))
                ))}
            </div>
        </div>
    );
}

export default Board; 