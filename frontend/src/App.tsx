import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Initial from './pages/Initial';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <div id="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Initial />} />
                    <Route path="/auth/*" element={<Auth />} />
                    {/* <PrivateRoute allow={token} redirect="/notFound" /> */}
                    <Route path="/home/*" element={<Home />} />
                </Routes>
            </Router>
            <ToastContainer />
        </div>
    );
}

