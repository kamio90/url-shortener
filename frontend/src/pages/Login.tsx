import {useState} from 'react';
import {login} from '../api/auth';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login: setToken} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const {token} = await login(email, password);
            setToken(token);
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="p-8 bg-white rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full rounded mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full rounded mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;