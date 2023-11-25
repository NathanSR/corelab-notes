import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Initial from './pages/Initial';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';


export default function App() {
    return (
        <div id="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Initial />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

