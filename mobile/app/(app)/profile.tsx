import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';

export default function Profile() {
    const { user, logout } = useAuth();
    const { colors } = useTheme();
    const router = useRouter();

    const menuItems = [
        { title: 'Personal Info', icon: 'user', route: '/profile-screens/personal-info' },
        { title: 'Bookmarks', icon: 'bookmark', route: '/profile-screens/bookmarks' },
        { title: 'Achievements', icon: 'trophy', route: '/profile-screens/achievements' },
        { title: 'Notifications', icon: 'bell', route: '/profile-screens/notifications' },
        { title: 'Settings', icon: 'cog', route: '/profile-screens/settings' },
    ];

    // Add admin menu item if user is admin
    if (user?.role === 'admin') {
        menuItems.unshift({
            title: 'Admin Dashboard',
            icon: 'dashboard',
            route: '/(app)/admin-dashboard'
        });
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface }]}>
                <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                    <FontAwesome name="user" size={40} color={colors.primary} />
                </View>
                <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
                <Text style={[styles.email, { color: colors.textSecondary }]}>{user?.email}</Text>
                {user?.role === 'admin' && (
                    <View style={styles.adminBadge}>
                        <FontAwesome name="shield" size={12} color="#fff" />
                        <Text style={styles.adminText}>Admin</Text>
                    </View>
                )}
            </View>

            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => router.push(item.route)}
                    >
                        <Card style={[styles.menuCard, { backgroundColor: colors.surface }]}>
                            <FontAwesome name={item.icon} size={20} color={colors.primary} />
                            <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
                            <FontAwesome name="chevron-right" size={16} color={colors.textSecondary} />
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 32,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
    },
    adminBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e74c3c',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginTop: 8,
    },
    adminText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    menu: {
        padding: 16,
    },
    menuItem: {
        marginBottom: 8,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
    },
    logoutBtn: {
        margin: 16,
        padding: 16,
        backgroundColor: '#e74c3c',
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});