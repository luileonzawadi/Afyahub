import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';
import { Card } from '../../components/Card';
import { databaseService, Achievement } from '../../services/databaseService';

export default function Achievements() {
    const router = useRouter();
    const { user } = useAuth();
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked'>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadAchievements();
        }
    }, [user]);

    const loadAchievements = async () => {
        try {
            setLoading(true);
            const userAchievements = await databaseService.getUserAchievements(user!.id);
            setAchievements(userAchievements);
        } catch (error) {
            console.error('Failed to load achievements:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAchievements = achievements.filter(achievement => {
        if (activeTab === 'all') return true;
        if (activeTab === 'unlocked') return achievement.unlocked;
        if (activeTab === 'locked') return !achievement.unlocked;
        return true;
    });

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    const renderAchievement = ({ item }: { item: Achievement }) => (
        <Card style={[
            styles.achievementCard,
            !item.unlocked && styles.lockedAchievement
        ]}>
            <View style={styles.achievementContent}>
                <View style={[
                    styles.achievementIcon,
                    item.unlocked ? styles.unlockedIcon : styles.lockedIcon
                ]}>
                    <FontAwesome
                        name={item.unlocked ? (item.icon as any) : 'lock'}
                        size={24}
                        color={item.unlocked ? Colors.surface : Colors.textSecondary}
                    />
                </View>
                <View style={styles.achievementDetails}>
                    <Text style={[
                        styles.achievementTitle,
                        !item.unlocked && styles.lockedText
                    ]}>
                        {item.title}
                    </Text>
                    <Text style={[
                        styles.achievementDescription,
                        !item.unlocked && styles.lockedText
                    ]}>
                        {item.description}
                    </Text>
                    {item.unlocked && item.unlockedDate && (
                        <Text style={styles.unlockedDate}>
                            Unlocked {item.unlockedDate.toLocaleDateString()}
                        </Text>
                    )}
                    {!item.unlocked && item.progress !== undefined && item.maxProgress && (
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>
                                {item.progress} / {item.maxProgress}
                            </Text>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${(item.progress / item.maxProgress) * 100}%` }
                                    ]}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Card>
    );

    const tabs = [
        { key: 'all', label: 'All', count: totalCount },
        { key: 'unlocked', label: 'Unlocked', count: unlockedCount },
        { key: 'locked', label: 'Locked', count: totalCount - unlockedCount },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Achievements</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.statsContainer}>
                <Card style={styles.statsCard}>
                    <Text style={styles.statsValue}>{unlockedCount}</Text>
                    <Text style={styles.statsLabel}>Unlocked</Text>
                </Card>
                <Card style={styles.statsCard}>
                    <Text style={styles.statsValue}>{totalCount - unlockedCount}</Text>
                    <Text style={styles.statsLabel}>Remaining</Text>
                </Card>
                <Card style={styles.statsCard}>
                    <Text style={styles.statsValue}>{Math.round((unlockedCount / totalCount) * 100)}%</Text>
                    <Text style={styles.statsLabel}>Complete</Text>
                </Card>
            </View>

            <View style={styles.tabsContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => setActiveTab(tab.key as any)}
                        style={[
                            styles.tab,
                            activeTab === tab.key && styles.activeTab
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab.key && styles.activeTabText
                        ]}>
                            {tab.label} ({tab.count})
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredAchievements}
                renderItem={renderAchievement}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.achievementsList}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <FontAwesome name="trophy" size={48} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>No achievements found</Text>
                    </View>
                }
            />
        </View>
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: Colors.surface,
    },
    statsCard: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        padding: 16,
    },
    statsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    statsLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    activeTabText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    achievementsList: {
        padding: 16,
    },
    achievementCard: {
        marginBottom: 12,
    },
    lockedAchievement: {
        opacity: 0.7,
    },
    achievementContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    achievementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    unlockedIcon: {
        backgroundColor: Colors.primary,
    },
    lockedIcon: {
        backgroundColor: Colors.border,
    },
    achievementDetails: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    achievementDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 8,
        lineHeight: 18,
    },
    lockedText: {
        color: Colors.textSecondary,
    },
    unlockedDate: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '500',
    },
    progressContainer: {
        marginTop: 8,
    },
    progressText: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    progressBar: {
        height: 4,
        backgroundColor: Colors.border,
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 64,
    },
    emptyText: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginTop: 16,
    },
});