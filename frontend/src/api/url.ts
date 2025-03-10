export const shortenUrl = async (url: string, token: string) => {
    try {
        const res = await api.post(
            '/url/shorten',
            {url},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return res.data;
    } catch (error) {
        console.error('Shorten URL error:', error);
        throw new Error(error.response?.data?.message || 'URL shortening failed');
    }
};
