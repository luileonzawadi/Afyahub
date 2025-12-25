import { Redirect, Tabs, router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function AppLayout() {
    const { user, isLoading } = useAuth();
    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
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
                headerTitle: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="heartbeat" size={20} color="#4A90E2" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#2C3E50', fontWeight: 'bold', fontSize: 16 }}>AfyaHub</Text>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: '#FFFFFF', // White header
                },
                headerTitleStyle: {
                    color: '#2C3E50',
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push('/(app)/profile')} style={{ marginRight: 15 }}>
                        <FontAwesome name="user" size={24} color={colors.primary} />
                    </TouchableOpacity>
                ),
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#B8D4F0',
                tabBarStyle: {
                    backgroundColor: '#4A90E2',
                    borderTopColor: '#3A7BC8',
                    borderTopWidth: 1,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingHorizontal: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    flexWrap: 'wrap',
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="course-list"
                options={{
                    title: 'Courses',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="forum"
                options={{
                    title: 'Forum',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="comments" size={size} color={color} />
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
