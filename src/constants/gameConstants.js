// Ship configurations
export const SHIPS = [
    { id: 1, name: "Aircraft Carrier", size: 5 },
    { id: 2, name: "Battleship", size: 4 },
    { id: 3, name: "Cruiser", size: 3 },
    { id: 4, name: "Destroyer", size: 3 },
    { id: 5, name: "Submarine", size: 2 },
];

// Game states
export const GAME_STATES = {
    SETUP: 'setup',
    PLAYING: 'playing',
    GAME_OVER: 'gameover',
};

export const GAME_MODES = {
    NORMAL: 'Normal',
    EASY: 'Easy'
};

// Calculate total ship cells
export const TOTAL_SHIP_CELLS = SHIPS.reduce((total, ship) => total + ship.size, 0); 