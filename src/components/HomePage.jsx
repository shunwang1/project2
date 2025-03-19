import { useNavigate } from 'react-router-dom'; // ✅ 确保导入 useNavigate
import { useGame } from '../context/GameContext';
import Rule_page from './Rule_page';

function HomePage() {
    const navigate = useNavigate(); // ✅ 使用 useNavigate 进行页面跳转

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Battleship</h1>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/game/normal')}
                        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                    >
                        Normal Mode
                    </button>
                    <button
                        onClick={() => navigate('/game/easy')}
                        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                    >
                        Easy Mode
                    </button>

                    <button
                        onClick={() => navigate('/rules')}
                        className="w-full px-6 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
                    >
                        Rules
                    </button>

                    <button
                        onClick={() => navigate('/highscores')}
                        className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                    >
                        High Scores
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;