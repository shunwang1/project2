import React from 'react';

function RulePage() {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8">Battleship Game Rules</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">Game Setup</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Each player has a 10x10 grid</li>
                        <li>Players place their ships on their grid</li>
                        <li>Ships cannot overlap or be placed diagonally</li>
                        <li>Ships cannot be placed outside the grid</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Ships</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Aircraft Carrier: 5 cells</li>
                        <li>Battleship: 4 cells</li>
                        <li>Cruiser: 3 cells</li>
                        <li>Submarine: 3 cells</li>
                        <li>Destroyer: 2 cells</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Gameplay</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Players take turns attacking one cell at a time</li>
                        <li>Each attack must be on a different cell</li>
                        <li>A hit is marked with a red cell</li>
                        <li>A miss is marked with a gray cell</li>
                        <li>When all cells of a ship are hit, the ship is sunk</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Winning</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The first player to sink all of their opponent's ships wins</li>
                        <li>Game ends when all ships of one player are sunk</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Game Modes</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Normal Mode: Players place their own ships</li>
                        <li>Easy Mode: Computer places ships randomly, player attacks</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export default RulePage;
