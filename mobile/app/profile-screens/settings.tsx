import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

export default function Settings() {
    const router = useRouter();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [settings, setSettings] = useState({
        notifications: true,
        autoPlay: true,
        downloadQuality: 'high',
        language: 'en',
    });

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

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This action cannot be undone. All your data will be permanently deleted.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        // TODO: Implement account deletion
                        Alert.alert('Account Deletion', 'Account deletion not implemented yet');
                    }
                }
            ]
        );
    };

    const toggleSetting = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof prev]
        }));
    };

    const settingItems = [
        {
            id: 'appearance',
            title: 'Appearance',
            icon: 'paint-brush',
            items: [
                {
                    label: 'Dark Mode',
                    type: 'switch',
                    value: isDarkMode,
                    onValueChange: toggleDarkMode,
                },
            ],
        },
        {
            id: 'learning',
            title: 'Learning Preferences',
            icon: 'book',
            items: [
                {
                    label: 'Auto-play videos',
                    type: 'switch',
                    value: settings.autoPlay,
                    onValueChange: () => toggleSetting('autoPlay'),
                },
                {
                    label: 'Download Quality',
                    type: 'select',
                    value: settings.downloadQuality,
                    options: [
                        { label: 'High (HD)', value: 'high' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Low', value: 'low' },
                    ],
                },
            ],
        },
        {
            id: 'notifications',
            title: 'Notifications',
            icon: 'bell',
            action: () => router.push('/profile/notifications'),
        },
        {
            id: 'privacy',
            title: 'Privacy & Security',
            icon: 'shield',
            items: [
                {
                    label: 'Change Password',
                    type: 'action',
                    onPress: () => {
                        // TODO: Navigate to change password screen
                        Alert.alert('Change Password', 'Not implemented yet');
                    },
                },
            ],
        },
        {
            id: 'support',
            title: 'Support',
            icon: 'question-circle',
            items: [
                {
                    label: 'Help Center',
                    type: 'action',
                    onPress: () => {
                        // TODO: Open help center
                        Alert.alert('Help Center', 'Not implemented yet');
                    },
                },
                {
                    label: 'Contact Support',
                    type: 'action',
                    onPress: () => {
                        // TODO: Open contact form
                        Alert.alert('Contact Support', 'Not implemented yet');
                    },
                },
                {
                    label: 'Report a Problem',
                    type: 'action',
                    onPress: () => {
                        // TODO: Open bug report form
                        Alert.alert('Report Problem', 'Not implemented yet');
                    },
                },
            ],
        },
        {
            id: 'about',
            title: 'About',
            icon: 'info-circle',
            items: [
                {
                    label: 'Version',
                    type: 'info',
                    value: '1.0.0',
                },
                {
                    label: 'Terms of Service',
                    type: 'action',
                    onPress: () => {
                        // TODO: Open terms
                        Alert.alert('Terms of Service', 'Not implemented yet');
                    },
                },
                {
                    label: 'Privacy Policy',
                    type: 'action',
                    onPress: () => {
                        // TODO: Open privacy policy
                        Alert.alert('Privacy Policy', 'Not implemented yet');
                    },
                },
            ],
        },
    ];

    const renderSettingItem = (item: any, sectionId: string) => {
        if (item.type === 'switch') {
            return (
                <View key={item.label} style={styles.settingRow}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: Colors.border, true: Colors.primary }}
                        thumbColor={item.value ? Colors.surface : Colors.textSecondary}
                    />
                </View>
            );
        }

        if (item.type === 'select') {
            return (
                <TouchableOpacity key={item.label} style={styles.settingRow}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <View style={styles.selectContainer}>
                        <Text style={styles.selectValue}>
                            {item.options?.find((opt: any) => opt.value === item.value)?.label || item.value}
                        </Text>
                        <FontAwesome name="chevron-right" size={14} color={Colors.textSecondary} />
                    </View>
                </TouchableOpacity>
            );
        }

        if (item.type === 'action') {
            return (
                <TouchableOpacity key={item.label} style={styles.settingRow} onPress={item.onPress}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <FontAwesome name="chevron-right" size={14} color={Colors.textSecondary} />
                </TouchableOpacity>
            );
        }

        if (item.type === 'info') {
            return (
                <View key={item.label} style={styles.settingRow}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.infoValue}>{item.value}</Text>
                </View>
            );
        }

        return null;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.content}>
                {settingItems.map(section => (
                    <View key={section.id} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <FontAwesome name={section.icon as any} size={16} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>

                        {section.action ? (
                            <TouchableOpacity style={styles.sectionAction} onPress={section.action}>
                                <Card style={styles.sectionCard}>
                                    <Text style={styles.sectionActionText}>Manage {section.title.toLowerCase()}</Text>
                                    <FontAwesome name="chevron-right" size={16} color={Colors.textSecondary} />
                                </Card>
                            </TouchableOpacity>
                        ) : (
                            <Card style={styles.sectionCard}>
                                {section.items?.map(item => renderSettingItem(item, section.id))}
                            </Card>
                        )}
                    </View>
                ))}

                <View style={styles.dangerZone}>
                    <Card style={styles.dangerCard}>
                        <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
                            <FontAwesome name="trash" size={16} color="#dc3545" />
                            <Text style={styles.dangerText}>Delete Account</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    headerRight: {
        width: 40,
    },
    content: {
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginLeft: 8,
    },
    sectionCard: {
        padding: 16,
    },
    sectionAction: {
        marginTop: 8,
    },
    sectionActionText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '500',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border + '30', // 30% opacity
    },
    settingLabel: {
        fontSize: 16,
        color: Colors.text,
        flex: 1,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectValue: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginRight: 8,
    },
    infoValue: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    dangerZone: {
        marginTop: 32,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    dangerCard: {
        backgroundColor: '#fee',
        borderColor: '#fcc',
    },
    dangerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    dangerText: {
        fontSize: 16,
        color: '#dc3545',
        fontWeight: '600',
        marginLeft: 12,
    },
});