import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
// Using FontAwesome for the heartbeat icon similar to the web
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/register', {
                name,
                email,
                password
            });
            Alert.alert(
                'Success',
                'Registration successful! Please login with your credentials.',
                [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
            );
        } catch (error: any) {
            const msg = error.response?.data?.detail || 'Registration failed. Please try again.';
            Alert.alert('Registration Error', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <FontAwesome name="heartbeat" size={40} color={Colors.primary} />
                    <Text style={styles.logoText}>AfyaHub</Text>
                </View>
                <Text style={styles.subtitle}>Create your account to start learning</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your full name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="your@email.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Create Account</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/auth/login')}>
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.link}>Login here</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: Colors.surface,
        color: Colors.text,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 14,
    },
    link: {
        color: Colors.primary,
        fontWeight: '600',
    },
});