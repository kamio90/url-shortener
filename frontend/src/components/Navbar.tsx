import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
    const {token, logout} = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl">URL Shortener</Link>
            <div>
                {token ? (
                    <>
                        <Link to="/dashboard" className="mr-4">Dashboard</Link>
                        <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
