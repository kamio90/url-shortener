import {useEffect, useState} from 'react';
import {getMyUrls, shortenUrl} from '../api/url';
import {useAuth} from '../context/AuthContext';

const Dashboard = () => {
    const {token} = useAuth();
    const [urls, setUrls] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
            const data = await getMyUrls(token);
            setUrls(data.urls);
        };
        fetchUrls();
    }, [token]);

    const handleShorten = async () => {
        if (!url) return;
        const data = await shortenUrl(url, token);
        setUrls([...urls, {shortId: data.shortId, originalUrl: url, visitCount: 0}]);
        setUrl('');
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            {/* Shorten URL Form */}
            <div className="flex mb-6">
                <input
                    type="text"
                    placeholder="Enter URL to shorten"
                    className="border p-2 flex-1 rounded-l"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={handleShorten}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                    Shorten
                </button>
            </div>

            {/* URLs Table */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">Short URL</th>
                    <th className="border p-2">Original URL</th>
                    <th className="border p-2">Visits</th>
                </tr>
                </thead>
                <tbody>
                {urls.map((url) => (
                    <tr key={url.shortId} className="text-center">
                        <td className="border p-2">
                            <a href={`http://localhost:3000/api/url/${url.shortId}`} target="_blank"
                               className="text-blue-500">
                                {url.shortId}
                            </a>
                        </td>
                        <td className="border p-2">{url.originalUrl}</td>
                        <td className="border p-2">{url.visitCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;