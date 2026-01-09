import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    phone?: string;
    bio?: string;
    createdAt: Date;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const mockUser: User = {
            id: '1',
            email,
            name: 'Test User',
            role: 'learner',
            createdAt: new Date()
        };
        setUser(mockUser);
    };

    const register = async (email: string, password: string, name: string) => {
        const mockUser: User = {
            id: '1',
            email,
            name,
            role: 'learner',
            createdAt: new Date()
        };
        setUser(mockUser);
    };

    const logout = async () => {
        setUser(null);
    };

    const updateUser = async (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}
