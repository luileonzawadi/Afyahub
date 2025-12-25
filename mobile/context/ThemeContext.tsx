import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: typeof lightColors;
}

const lightColors = {
    primary: '#4A90E2',
    secondary: '#7B68EE',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#5A6C7D',
    border: '#E1E8ED',
    error: '#E74C3C',
    success: '#27AE60',
};

const darkColors = {
    primary: '#4A90E2',
    secondary: '#7B68EE',
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#404040',
    error: '#E74C3C',
    success: '#27AE60',
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}