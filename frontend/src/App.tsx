import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Initial from './pages/Initial';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextGlobal, } from './contexts/Global.context';
import { useContext } from 'react';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    let { token } = useContext(ContextGlobal)

    return (
        <div id="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Initial />} />
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="/home/*" element={<PrivateRoute allow={!!token} redirect="/auth/login" children={<Home />} />} />
                </Routes>
            </Router>
            <ToastContainer />
        </div>
    );
}

