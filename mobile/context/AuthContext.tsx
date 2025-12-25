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
    phone?: string;
    bio?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<User>) => Promise<void>;
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
        setIsLoading(false);
    };

    const login = async (email: string, password: string) => {
        const mockUser = {
            id: 1,
            email: email,
            name: 'Test User',
            role: 'learner'
        };
        setUser(mockUser);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const updateUser = async (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
