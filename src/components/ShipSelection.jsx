import { useGame } from '../context/GameContext';
import { SHIPS, GAME_STATES, GAME_MODES } from '../constants/gameConstants';



function ShipSelection() {
    const { 
        gameMode,
        gameState, 
        playerShips, 
        selectedShip, 
        shipOrientation, 
        handleShipSelect, 
        toggleOrientation 
    } = useGame();

    if (gameState !== GAME_STATES.SETUP||gameMode !== GAME_MODES.NORMAL) return null;
    
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Select and place your ships</h3>
            <button 
                onClick={toggleOrientation} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                {shipOrientation === 'horizontal' ? 'Switch to Vertical' : 'Switch to Horizontal'}
            </button>
            <div className="flex flex-wrap gap-4">
                {SHIPS.map(ship => {
                    const isPlaced = playerShips.some(s => s.id === ship.id);
                    const isSelected = selectedShip && selectedShip.id === ship.id;
                    
                    return (
                        <div 
                            key={ship.id} 
                            className={`p-2 border rounded ${isPlaced ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'} ${isSelected ? 'border-blue-500 border-2' : ''}`}
                            onClick={() => !isPlaced && handleShipSelect(ship)}
                        >
                            <p>{ship.name} ({ship.size} cells)</p>
                            <div className="flex">
                                {[...Array(ship.size)].map((_, i) => (
                                    <div key={i} className="w-6 h-6 ship"></div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ShipSelection; 