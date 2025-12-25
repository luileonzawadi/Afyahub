import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <StatusBar style="dark" />
                <Slot />
            </AuthProvider>
        </ThemeProvider>
    );
}
