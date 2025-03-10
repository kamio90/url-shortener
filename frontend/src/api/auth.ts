import {api} from './axios';

export const login = async (email: string, password: string) => {
    try {
        const res = await api.post('/auth/login', {email, password});
        return res.data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const register = async (email: string, password: string) => {
    try {
        const res = await api.post('/auth/register', {email, password});
        return res.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};
