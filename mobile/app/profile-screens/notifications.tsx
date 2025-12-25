import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/Card';

interface NotificationSetting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

export default function Notifications() {
    const router = useRouter();
    const [settings, setSettings] = useState<NotificationSetting[]>([
        {
            id: 'course_updates',
            title: 'Course Updates',
            description: 'Get notified about new modules and course progress',
            enabled: true,
        },
        {
            id: 'forum_activity',
            title: 'Forum Activity',
            description: 'Receive notifications for forum replies and mentions',
            enabled: true,
        },
        {
            id: 'achievements',
            title: 'Achievements',
            description: 'Celebrate your learning milestones',
            enabled: true,
        },
        {
            id: 'reminders',
            title: 'Learning Reminders',
            description: 'Daily reminders to continue your learning journey',
            enabled: false,
        },
        {
            id: 'announcements',
            title: 'Announcements',
            description: 'Important updates and announcements from AfyaHub',
            enabled: true,
        },
    ]);

    const toggleSetting = (id: string) => {
        setSettings(prev =>
            prev.map(setting =>
                setting.id === id
                    ? { ...setting, enabled: !setting.enabled }
                    : setting
            )
        );
    };

    const saveSettings = async () => {
        try {
            // TODO: Save settings to backend
            console.log('Saving notification settings:', settings);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    };

    useEffect(() => {
        // Auto-save when settings change
        const timeoutId = setTimeout(saveSettings, 1000);
        return () => clearTimeout(timeoutId);
    }, [settings]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.content}>
                <Text style={styles.description}>
                    Choose what notifications you'd like to receive to stay updated with your learning progress.
                </Text>

                <View style={styles.settingsContainer}>
                    {settings.map(setting => (
                        <Card key={setting.id} style={styles.settingCard}>
                            <View style={styles.settingContent}>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>{setting.title}</Text>
                                    <Text style={styles.settingDescription}>
                                        {setting.description}
                                    </Text>
                                </View>
                                <Switch
                                    value={setting.enabled}
                                    onValueChange={() => toggleSetting(setting.id)}
                                    trackColor={{ false: Colors.border, true: Colors.primary }}
                                    thumbColor={setting.enabled ? Colors.surface : Colors.textSecondary}
                                />
                            </View>
                        </Card>
                    ))}
                </View>

                <View style={styles.infoContainer}>
                    <Card style={styles.infoCard}>
                        <FontAwesome name="info-circle" size={20} color={Colors.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>Notification Preferences</Text>
                            <Text style={styles.infoText}>
                                You can change these settings anytime. We'll respect your preferences and only send notifications you've enabled.
                            </Text>
                        </View>
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
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 24,
        lineHeight: 20,
    },
    settingsContainer: {
        marginBottom: 24,
    },
    settingCard: {
        marginBottom: 12,
    },
    settingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    settingInfo: {
        flex: 1,
        marginRight: 16,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    infoContainer: {
        marginTop: 8,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: Colors.primary + '10', // 10% opacity
    },
    infoContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
});