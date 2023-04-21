import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './styles/App.css';
import Ranking from './Ranking.js';
import Recommender from "./Recommender";
import Map from './Map';

export default function App() {
    return (
        <Router>
            <div>
                <div className='navigation'>
                    <div className='nav'>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/games" className='linkName'>Game Ranking</Link>
                                </li>
                                <li>
                                    <Link to="/recommendation" className='linkName' >Game Recommender</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Routes>
                    <Route path="/games" element={<Ranking />}/>
                    <Route path="/recommendation" element={<Recommender/>}/>
                </Routes>
            </div>
        </Router>
    );
}