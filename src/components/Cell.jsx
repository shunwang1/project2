import { useGame } from '../context/GameContext';
import { GAME_STATES } from '../constants/gameConstants';

function Cell({ row, col, isPlayer }) {
    const { 
        gameState, 
        playerBoard, 
        computerBoard, 
        selectedShip, 
        shipOrientation, 
        handlePlaceShip, 
        handlePlayerAttack,
        canPlaceShip
    } = useGame();

    const board = isPlayer ? playerBoard : computerBoard;
    const cell = board[row][col];
    
    // Generate cell CSS class
    const getCellClass = () => {
        let cellClass = "w-8 h-8 border border-blue-400 bg-blue-200";
        
        if (gameState === GAME_STATES.SETUP && isPlayer) {
            if (selectedShip) {
                let canPlace = true;
                for (let i = 0; i < selectedShip.size; i++) {
                    const r = shipOrientation === 'horizontal' ? row : row + i;
                    const c = shipOrientation === 'horizontal' ? col + i : col;
                    if (r >= 10 || c >= 10 || playerBoard[r][c] !== null) {
                        canPlace = false;
                        break;
                    }
                }
                cellClass += canPlace ? " bg-green-200 hover:bg-green-300" : " bg-red-200";
            } else {
                cellClass += " hover:bg-green-200";
            }
        } else if (!isPlayer && gameState === GAME_STATES.PLAYING && !cell?.attacked) {
            cellClass += " hover:bg-green-200";
        }
        
        if (cell) {
            if (isPlayer && cell.shipId && !cell.attacked) {
                cellClass += " ship-placed";
            }
            
            if (cell.attacked) {
                cellClass += cell.hit ? " hit" : " miss";
            }
        }

        return cellClass;
    };

    // Handle cell click
    const handleClick = () => {
        if (isPlayer && gameState === GAME_STATES.SETUP) {
            handlePlaceShip(row, col);
        } else if (!isPlayer && gameState === GAME_STATES.PLAYING) {
            handlePlayerAttack(row, col);
        }
    };

    return (
        <div 
            className={getCellClass()} 
            onClick={handleClick}
        ></div>
    );
}

export default Cell; 