import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useRouter, useSegments } from 'expo-router';
import api from '../services/api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // OPTIONAL: Validate token with backend here if needed
                const userJson = await SecureStore.getItemAsync(USER_KEY);
                if (userJson) {
                    setUser(JSON.parse(userJson));
                }
            }
        } catch (e) {
            console.error('Auth Check Error:', e);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token } = response.data;

            // Store token
            await SecureStore.setItemAsync(TOKEN_KEY, access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

            // Get User Details
            const userResponse = await api.get('/auth/me');
            const userData = userResponse.data;

            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
            setUser(userData);

            // Navigate is handled by the layout or the component calling login usually
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
