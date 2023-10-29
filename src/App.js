import Topbar from './components/layouts/components/Topbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Single from './pages/Single';
import Write from './pages/Write';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
    const user = false;

    return (
        <Router>
            <Topbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={user ? <Home /> : <Login />}></Route>
                <Route path="/register" element={user ? <Home /> : <Register />}></Route>
                <Route path="/write" element={user ? <Write /> : <Register />}></Route>
                <Route path="/settings" element={user ? <Settings /> : <Register />}></Route>
                <Route path="/post/:postId" element={<Single />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
