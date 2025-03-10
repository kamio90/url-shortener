import Navbar from './components/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAuth} from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    const {token} = useAuth();

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={token ? <Dashboard/> : <Navigate to="/login"/>}/>
            </Routes>
        </>
    );
}

export default App;
