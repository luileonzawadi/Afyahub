import { Redirect, Tabs, router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

export default function AppLayout() {
    const { user, isLoading } = useAuth();
    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
                <Text style={{ color: Colors.text }}>Loading...</Text>
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/auth/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerTitle: () => (
                    <View style={styles.headerTitleContainer}>
                        <View style={styles.logoContainer}>
                            <FontAwesome name="heartbeat" size={18} color="#FFFFFF" />
                        </View>
                        <Text style={styles.headerTitleText}>AfyaHub</Text>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: Colors.headerBg,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.border,
                    height: Platform.OS === 'ios' ? 100 : 80,
                },
                headerTitleStyle: {
                    display: 'none', // We are using a custom component
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push('/(app)/profile')} style={styles.headerRight}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
                        </View>
                    </TouchableOpacity>
                ),
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.tabBarInactive,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    height: Platform.OS === 'ios' ? 85 : 70,
                    paddingTop: 10,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome name="home" size={24} color={color} style={focused ? styles.activeIcon : null} />
                    ),
                }}
            />
            <Tabs.Screen
                name="course-list"
                options={{
                    title: 'Courses',
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome name="book" size={24} color={color} style={focused ? styles.activeIcon : null} />
                    ),
                }}
            />
            <Tabs.Screen
                name="forum"
                options={{
                    title: 'Forum',
                    tabBarIcon: ({ color, size, focused }) => (
                        <FontAwesome name="comments" size={24} color={color} style={focused ? styles.activeIcon : null} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="course-detail"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="module-viewer"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="create-topic"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="admin-dashboard"
                options={{
                    href: null,
                }}
            />

        </Tabs>
    );
}

const styles = StyleSheet.create({
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 0,
    },
    logoContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    headerTitleText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: -0.5,
    },
    headerRight: {
        marginRight: Layout.spacing.m,
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    avatarText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    activeIcon: {
        // Optional: Add a subtle glow or scale effect if wanted
    }
});
