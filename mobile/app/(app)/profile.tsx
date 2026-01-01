import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

export default function Profile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const menuItems: { title: string; icon: React.ComponentProps<typeof FontAwesome>['name']; route: any }[] = [
        { title: 'Personal Info', icon: 'user', route: '/profile-screens/personal-info' },
        { title: 'Bookmarks', icon: 'bookmark', route: '/profile-screens/bookmarks' },
        { title: 'Achievements', icon: 'trophy', route: '/profile-screens/achievements' },
        { title: 'Notifications', icon: 'bell', route: '/profile-screens/notifications' },
        { title: 'Settings', icon: 'cog', route: '/profile-screens/settings' },
    ];

    if (user?.role === 'admin') {
        menuItems.unshift({
            title: 'Admin Dashboard',
            icon: 'dashboard',
            route: '/(app)/admin-dashboard'
        });
    }

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: logout, style: 'destructive' }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.editBadge}>
                        <FontAwesome name="camera" size={12} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>

                {user?.role === 'admin' && (
                    <View style={styles.adminBadge}>
                        <FontAwesome name="shield" size={12} color="#fff" />
                        <Text style={styles.adminText}>Administrator</Text>
                    </View>
                )}
            </View>

            <View style={styles.menu}>
                <Text style={styles.sectionTitle}>Account</Text>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => router.push(item.route)}
                        activeOpacity={0.7}
                    >
                        <Card style={styles.menuItem} variant="elevated">
                            <View style={[styles.iconContainer, { backgroundColor: Colors.primary + '10' }]}>
                                <FontAwesome name={item.icon} size={18} color={Colors.primary} />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <FontAwesome name="chevron-right" size={14} color={Colors.textSecondary} />
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footer}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    variant="outline"
                    style={{ borderColor: Colors.error }}
                    textStyle={{ color: Colors.error }}
                />
                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: Layout.spacing.xl,
        paddingHorizontal: Layout.spacing.l,
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: Layout.borderRadius.xl,
        borderBottomRightRadius: Layout.borderRadius.xl,
        ...Layout.shadows.medium,
        marginBottom: Layout.spacing.l,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: Layout.spacing.m,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.surface,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.surface,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    email: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.m,
    },
    adminBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.error,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    adminText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Layout.spacing.m,
        marginLeft: 4,
    },
    menu: {
        padding: Layout.spacing.m,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Layout.spacing.m,
        marginBottom: Layout.spacing.s,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.spacing.m,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
    },
    footer: {
        padding: Layout.spacing.l,
        paddingTop: 0,
        marginBottom: Layout.spacing.l,
    },
    version: {
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: Layout.spacing.l,
    },
});