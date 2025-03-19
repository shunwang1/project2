import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './Battleship.css'
import { GameProvider } from './context/GameContext'
import HomePage from './components/HomePage'
import NormalModel from './components/Normal_model'
import EasyModel from './components/Easy_model'
import Rule_page from './components/Rule_page'
import Highscores from './components/Highscores'
function App() {
    return (
        <Router>
            <GameProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game/normal" element={<NormalModel />} />
                    <Route path="/game/easy" element={<EasyModel />} />
                    <Route path="/rules" element={<Rule_page />} />
                    <Route path="/highscores" element={<Highscores />} />
                </Routes>
            </GameProvider>
        </Router>
    );
}

export default App
