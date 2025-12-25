import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from 'context';
import { Colors } from 'constants/Colors';
import { Card } from 'components/Card';
import Button from 'components/Button';

export default function Profile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout');
                        }
                    }
                }
            ]
        );
    };

    const menuItems = [
        {
            icon: 'user',
            title: 'Personal Information',
            subtitle: 'Update your profile details',
            onPress: () => router.push('/profile/personal-info'),
        },
        {
            icon: 'bookmark',
            title: 'Bookmarks',
            subtitle: 'Your saved courses and resources',
            onPress: () => router.push('/profile/bookmarks'),
        },
        {
            icon: 'bell',
            title: 'Notifications',
            subtitle: 'Manage your notification preferences',
            onPress: () => router.push('/profile/notifications'),
        },
        {
            icon: 'trophy',
            title: 'Achievements',
            subtitle: 'View your certificates and badges',
            onPress: () => router.push('/profile/achievements'),
        },
        {
            icon: 'cog',
            title: 'Settings',
            subtitle: 'App preferences and configuration',
            onPress: () => router.push('/profile/settings'),
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <FontAwesome name="user-circle" size={80} color={Colors.primary} />
                </View>
                <Text style={styles.name}>{user?.name || 'User'}</Text>
                <Text style={styles.email}>{user?.email || 'user@email.com'}</Text>
                <Text style={styles.role}>
                    {user?.role === 'admin' ? 'Administrator' : 'Learner'}
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Courses</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Certificates</Text>
                </Card>
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} onPress={item.onPress}>
                        <Card style={styles.menuItem}>
                            <View style={styles.menuIcon}>
                                <FontAwesome name={item.icon as any} size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={16} color={Colors.textSecondary} />
                        </Card>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.logoutContainer}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    variant="outline"
                />
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
        padding: 24,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
    },
    statCard: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        padding: 16,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    menuContainer: {
        padding: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 8,
    },
    menuIcon: {
        width: 40,
        alignItems: 'center',
    },
    menuContent: {
        flex: 1,
        marginLeft: 12,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    logoutContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    logoutButton: {
        borderColor: '#dc3545',
    },
});