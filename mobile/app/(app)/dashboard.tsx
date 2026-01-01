import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Image, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Card';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';

export default function Dashboard() {
    const { user } = useAuth();
    const [progress, setProgress] = useState<any>(null);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        // Simulations of API call
        setProgress({
            enrolledCourses: 3,
            completedModules: 12,
            certificates: 1,
            enrolledCoursesData: [
                {
                    id: 1,
                    title: 'HIV/AIDS Fundamentals',
                    progress: 75,
                    image: 'https://via.placeholder.com/300x150/0056D2/FFFFFF?text=HIV+Basics',
                    lastAccessed: '2 mins ago'
                },
                {
                    id: 2,
                    title: 'Prevention Strategies',
                    progress: 45,
                    image: 'https://via.placeholder.com/300x150/20B2AA/FFFFFF?text=Prevention',
                    lastAccessed: '1 day ago'
                }
            ]
        });
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const QuickAction = ({ icon, label, onPress, color }: any) => (
        <TouchableOpacity style={styles.quickAction} onPress={onPress}>
            <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
                <FontAwesome name={icon} size={24} color={color} />
            </View>
            <Text style={styles.quickActionText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.welcomeSection}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.username}>{user?.name || 'Learner'}!</Text>
                    </View>
                    <View style={styles.streakBadge}>
                        <FontAwesome name="fire" size={16} color="#DD6B20" />
                        <Text style={styles.streakText}>7 days</Text>
                    </View>
                </View>

                {/* Statistics Cards */}
                <View style={styles.statsContainer}>
                    <Card style={styles.statCard} variant="elevated">
                        <View style={[styles.statIconContainer, { backgroundColor: Colors.primaryLight }]}>
                            <FontAwesome name="book" size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.statValue}>{progress?.enrolledCourses || 0}</Text>
                        <Text style={styles.statLabel}>Enrolled</Text>
                    </Card>
                    <Card style={styles.statCard} variant="elevated">
                        <View style={[styles.statIconContainer, { backgroundColor: '#E6FFFA' }]}>
                            <FontAwesome name="check-circle" size={20} color={Colors.secondary} />
                        </View>
                        <Text style={styles.statValue}>{progress?.completedModules || 0}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </Card>
                    <Card style={styles.statCard} variant="elevated">
                        <View style={[styles.statIconContainer, { backgroundColor: '#FFFFF0' }]}>
                            <FontAwesome name="trophy" size={20} color="#D69E2E" />
                        </View>
                        <Text style={styles.statValue}>{progress?.certificates || 0}</Text>
                        <Text style={styles.statLabel}>Certificates</Text>
                    </Card>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsGrid}>
                    <QuickAction
                        icon="search"
                        label="Find Course"
                        color={Colors.primary}
                        onPress={() => router.push('/course-list')}
                    />
                    <QuickAction
                        icon="comments"
                        label="Community"
                        color={Colors.secondary}
                        onPress={() => router.push('/forum')}
                    />
                    <QuickAction
                        icon="user"
                        label="Profile"
                        color={Colors.info}
                        onPress={() => router.push('/profile')}
                    />
                    <QuickAction
                        icon="question-circle"
                        label="Help"
                        color={Colors.warning}
                        onPress={() => { }}
                    />
                </View>

                {/* Recent Courses */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Continue Learning</Text>
                    <TouchableOpacity onPress={() => router.push('/(app)/course-list')}>
                        <Text style={styles.browseAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {progress?.enrolledCoursesData?.length > 0 ? (
                    progress.enrolledCoursesData.map((course: any) => (
                        <TouchableOpacity
                            key={course.id}
                            onPress={() => router.push(`/(app)/course-detail?id=${course.id}`)}
                            activeOpacity={0.9}
                        >
                            <Card style={styles.courseCard} variant="elevated">
                                <Image source={{ uri: course.image }} style={styles.courseImage} />
                                <View style={styles.courseContent}>
                                    <View style={styles.courseHeader}>
                                        <Text style={styles.courseTitle} numberOfLines={1}>{course.title}</Text>
                                        <Text style={styles.lastAccessed}>{course.lastAccessed}</Text>
                                    </View>

                                    <View style={styles.progressContainer}>
                                        <View style={styles.progressBarBg}>
                                            <View style={[styles.progressBarFill, { width: `${course.progress || 0}%` }]} />
                                        </View>
                                        <Text style={styles.progressText}>{course.progress || 0}%</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Card style={styles.emptyCard} variant="outlined">
                        <FontAwesome name="book" size={40} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>Start your learning journey today!</Text>
                        <TouchableOpacity onPress={() => router.push('/course-list')} style={styles.startLearningBtn}>
                            <Text style={styles.startLearningText}>Browse Courses</Text>
                        </TouchableOpacity>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        padding: Layout.spacing.m,
        paddingBottom: Layout.spacing.xxl,
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Layout.spacing.l,
        marginTop: Layout.spacing.s,
    },
    greeting: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 2,
    },
    username: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: -0.5,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F0',
        paddingHorizontal: Layout.spacing.m,
        paddingVertical: Layout.spacing.s,
        borderRadius: Layout.borderRadius.round,
        borderWidth: 1,
        borderColor: '#FED7D7',
    },
    streakText: {
        marginLeft: 6,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#C05621',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Layout.spacing.l,
    },
    statCard: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        padding: Layout.spacing.m,
        justifyContent: 'center',
    },
    statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Layout.spacing.s,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Layout.spacing.m,
        marginTop: Layout.spacing.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        letterSpacing: -0.5,
    },
    browseAll: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: Layout.spacing.l,
    },
    quickAction: {
        width: '48%',
        backgroundColor: Colors.surface,
        padding: Layout.spacing.m,
        borderRadius: Layout.borderRadius.m,
        alignItems: 'center',
        marginBottom: Layout.spacing.s,
        flexDirection: 'row',
        ...Layout.shadows.small,
    },
    quickActionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Layout.spacing.s,
    },
    quickActionText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    courseCard: {
        marginBottom: Layout.spacing.m,
        padding: 0,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: 140,
        backgroundColor: Colors.primaryLight,
    },
    courseContent: {
        padding: Layout.spacing.m,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Layout.spacing.s,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
        marginRight: 8,
    },
    lastAccessed: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontStyle: 'italic',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        backgroundColor: Colors.border,
        borderRadius: 3,
        marginRight: Layout.spacing.s,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: Colors.success,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textSecondary,
        width: 35,
        textAlign: 'right',
    },
    emptyCard: {
        alignItems: 'center',
        padding: Layout.spacing.xl,
        borderStyle: 'dashed',
    },
    emptyText: {
        marginTop: Layout.spacing.m,
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.m,
    },
    startLearningBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: Colors.primary,
        borderRadius: Layout.borderRadius.m,
    },
    startLearningText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
