import { createContext, useContext, useState, useEffect } from 'react';
import { SHIPS, GAME_STATES, GAME_MODES, TOTAL_SHIP_CELLS } from '../constants/gameConstants';

// Create context
const GameContext = createContext();

// Context provider component
export function GameProvider({ children }) {
    const [gameState, setGameState] = useState(GAME_STATES.SETUP);
    const [playerBoard, setPlayerBoard] = useState(Array(10).fill().map(() => Array(10).fill(null)));
    const [computerBoard, setComputerBoard] = useState(Array(10).fill().map(() => Array(10).fill(null)));
    const [playerShips, setPlayerShips] = useState([]);
    const [computerShips, setComputerShips] = useState([]);
    const [selectedShip, setSelectedShip] = useState(null);
    const [shipOrientation, setShipOrientation] = useState('horizontal');
    const [message, setMessage] = useState("Please place your ships");
    const [playerHits, setPlayerHits] = useState(0);
    const [computerHits, setComputerHits] = useState(0);
    const [winner, setWinner] = useState(null);
    const [gameTime, setGameTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [gameMode, setGameMode] = useState(null);
    // Format time as minutes:seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Start timer
    const startTimer = () => {
        if (timerInterval) clearInterval(timerInterval);
        
        const interval = setInterval(() => {
            setGameTime(prevTime => prevTime + 1);
        }, 1000);
        
        setTimerInterval(interval);
    };

    // Stop timer
    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    };

    // Reset timer
    const resetTimer = () => {
        stopTimer();
        setGameTime(0);
    };

    // Initialize computer ships
    const initializeComputerShips = () => {
        // 先清除棋盘上的所有数据
        const newComputerBoard = Array(10).fill().map(() => Array(10).fill(null));
        const newComputerShips = [];

        SHIPS.forEach(ship => {
            let placed = false;
            while (!placed) {
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                
                if (canPlaceShip(newComputerBoard, row, col, ship.size, orientation)) {
                    const shipPositions = [];
                    
                    for (let i = 0; i < ship.size; i++) {
                        const r = orientation === 'horizontal' ? row : row + i;
                        const c = orientation === 'horizontal' ? col + i : col;
                        newComputerBoard[r][c] = { shipId: ship.id };
                        shipPositions.push({ row: r, col: c });
                    }
                    
                    newComputerShips.push({
                        ...ship,
                        positions: shipPositions,
                        orientation
                    });
                    
                    placed = true;
                }
            }
        });

        setComputerBoard(newComputerBoard);
        setComputerShips(newComputerShips);
    };

    // Check if a ship can be placed
    const canPlaceShip = (board, row, col, size, orientation) => {
        for (let i = 0; i < size; i++) {
            const r = orientation === 'horizontal' ? row : row + i;
            const c = orientation === 'horizontal' ? col + i : col;
            
            if (r >= 10 || c >= 10 || board[r][c] !== null) {
                return false;
            }
        }
        return true;
    };

    // Handle ship selection
    const handleShipSelect = (ship) => {
        if (playerShips.some(s => s.id === ship.id)) return;
        setSelectedShip(ship);
    };

    // Toggle ship orientation
    const toggleOrientation = () => {
        setShipOrientation(shipOrientation === 'horizontal' ? 'vertical' : 'horizontal');
    };

    // Handle player ship placement
    const handlePlaceShip = (row, col) => {
        if (!selectedShip || gameState !== GAME_STATES.SETUP) return;

        if (canPlaceShip(playerBoard, row, col, selectedShip.size, shipOrientation)) {
            const newPlayerBoard = [...playerBoard];
            const shipPositions = [];
            
            for (let i = 0; i < selectedShip.size; i++) {
                const r = shipOrientation === 'horizontal' ? row : row + i;
                const c = shipOrientation === 'horizontal' ? col + i : col;
                newPlayerBoard[r][c] = { shipId: selectedShip.id };
                shipPositions.push({ row: r, col: c });
            }
            
            const newPlayerShips = [...playerShips, {
                ...selectedShip,
                positions: shipPositions,
                orientation: shipOrientation
            }];
            
            setPlayerBoard(newPlayerBoard);
            setPlayerShips(newPlayerShips);
            setSelectedShip(null);
            
            if (newPlayerShips.length === SHIPS.length) {
                initializeComputerShips();
                setGameState(GAME_STATES.PLAYING);
                setMessage("Game started! Click on the computer's board to attack");
                startTimer(); // Start timing
            }
        }
    };

    // Handle player attack
    const handlePlayerAttack = (row, col) => {
        if (gameState !== GAME_STATES.PLAYING || (computerBoard[row][col] && computerBoard[row][col].attacked)) return;

        const newComputerBoard = [...computerBoard];
        const cell = newComputerBoard[row][col];
        const hit = cell !== null;
        
        newComputerBoard[row][col] = { 
            ...cell, 
            attacked: true,
            hit: hit
        };
        
        setComputerBoard(newComputerBoard);
        
        if (hit) {
            const newPlayerHits = playerHits + 1;
            setPlayerHits(newPlayerHits);
            setMessage("Hit enemy ship!");
            
            if (newPlayerHits === TOTAL_SHIP_CELLS) {
                setGameState(GAME_STATES.GAME_OVER);
                setWinner('player');
                setMessage("Congratulations! You've sunk all enemy ships!");
                stopTimer(); // Stop timing
                return;
            }
        } else {
            setMessage("Missed enemy ship");
        }
        
        // Computer's turn
        setTimeout(() => {
            computerAttack();
        }, 1000);
    };

    // Computer attack
    const computerAttack = () => {

        if (gameState !== GAME_STATES.PLAYING||gameMode === GAME_MODES.EASY) return;

        let row, col;
        let validAttack = false;
        
        while (!validAttack) {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            
            const cellToAttack = playerBoard[row][col];
            // Check if the position hasn't been attacked yet
            if (!(cellToAttack && cellToAttack.attacked)) {
                validAttack = true;
            }
        }
        
        const newPlayerBoard = [...playerBoard];
        const cell = newPlayerBoard[row][col];
        const hit = cell !== null;
        
        newPlayerBoard[row][col] = { 
            ...cell, 
            attacked: true,
            hit: hit
        };
        
        setPlayerBoard(newPlayerBoard);
        
        if (hit) {
            const newComputerHits = computerHits + 1;
            setComputerHits(newComputerHits);
            setMessage("Computer hit your ship!");
            
            if (newComputerHits === TOTAL_SHIP_CELLS) {
                setGameState(GAME_STATES.GAME_OVER);
                setWinner('computer');
                setMessage("Game over! The computer has sunk all your ships.");
                stopTimer(); // Stop timing
            }
        } else {
            setMessage("Computer missed your ship");
        }
    };

    // Reset game
    const resetGame = () => {
        
            setGameState(GAME_STATES.SETUP);
            setPlayerBoard(Array(10).fill().map(() => Array(10).fill(null)));
            setComputerBoard(Array(10).fill().map(() => Array(10).fill(null)));
            setPlayerShips([]);
            setComputerShips([]);
            setSelectedShip(null);
            setShipOrientation('horizontal');
            setMessage("Please place your ships");
            setPlayerHits(0);
            setComputerHits(0);
            setWinner(null);
            resetTimer(); 
        if(gameMode === GAME_MODES.EASY){
            setMessage("Game started! Click on the computer's board to attack");
            setGameState(GAME_STATES.PLAYING);
            initializeComputerShips();
            
        }
    };

    // Clean up timer
    useEffect(() => {
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [timerInterval]);

    // Provide context values
    const contextValue = {
        gameState,
        gameMode,
        playerBoard,
        computerBoard,
        playerShips,
        computerShips,
        selectedShip,
        shipOrientation,
        message,
        playerHits,
        computerHits,
        winner,
        gameTime,
        formatTime,
        handleShipSelect,
        toggleOrientation,
        handlePlaceShip,
        handlePlayerAttack,
        resetGame,
        canPlaceShip,
        initializeComputerShips,
        setGameState,
        setMessage,
        startTimer,
        setGameMode
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
}

// Custom hook for easier context usage
export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
} 