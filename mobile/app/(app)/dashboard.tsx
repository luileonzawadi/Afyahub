import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';
import { Card } from '../../components/Card';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const { user } = useAuth();
    const { colors } = useTheme();
    const [progress, setProgress] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        setProgress({
            enrolledCourses: 3,
            completedModules: 12,
            certificates: 1,
            enrolledCoursesData: [
                {
                    id: 1,
                    title: 'HIV/AIDS Fundamentals',
                    progress: 75,
                    image: 'https://via.placeholder.com/300x150/4A90E2/FFFFFF?text=HIV+Basics'
                },
                {
                    id: 2,
                    title: 'Prevention Strategies',
                    progress: 45,
                    image: 'https://via.placeholder.com/300x150/2ECC71/FFFFFF?text=Prevention'
                }
            ]
        });
        setLoading(false);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface }]}>
                <View>
                    <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
                    <Text style={[styles.username, { color: colors.text }]}>{user?.name || 'Learner'}!</Text>
                </View>
                <TouchableOpacity style={styles.streakContainer}>
                    <FontAwesome name="fire" size={20} color="#ff6b35" />
                    <Text style={[styles.streakText, { color: colors.text }]}>7 days</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <FontAwesome name="book" size={24} color="#4A90E2" />
                        <Text style={[styles.statValue, { color: colors.text }]}>{progress?.enrolledCourses || 0}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Enrolled</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <FontAwesome name="check-circle" size={24} color="#2ECC71" />
                        <Text style={[styles.statValue, { color: colors.text }]}>{progress?.completedModules || 0}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <FontAwesome name="trophy" size={24} color="#F39C12" />
                        <Text style={[styles.statValue, { color: colors.text }]}>{progress?.certificates || 0}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Certificates</Text>
                    </Card>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>My Courses</Text>
                    <TouchableOpacity onPress={() => router.push('/(app)/course-list')}>
                        <Text style={[styles.browseAll, { color: colors.primary }]}>Browse All</Text>
                    </TouchableOpacity>
                </View>
                {progress?.enrolledCoursesData?.length > 0 ? (
                    progress.enrolledCoursesData.map((course: any) => (
                        <TouchableOpacity
                            key={course.id}
                            onPress={() => router.push(`/(app)/course-detail?id=${course.id}`)}
                        >
                            <Card style={[styles.courseCard, { backgroundColor: colors.surface }]}>
                                <Image source={{ uri: course.image }} style={styles.courseImage} />
                                <View style={styles.courseContent}>
                                    <View style={styles.courseHeader}>
                                        <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
                                        <Text style={[styles.progressText, { color: colors.textSecondary }]}>{course.progress || 0}%</Text>
                                    </View>
                                    <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                                        <View style={[styles.progressBarFill, { width: `${course.progress || 0}%`, backgroundColor: colors.primary }]} />
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Card style={[styles.emptyCard, { backgroundColor: colors.surface }]}>
                        <FontAwesome name="book" size={40} color={colors.textSecondary} />
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No enrolled courses yet</Text>
                    </Card>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
    },
    greeting: {
        fontSize: 14,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    streakText: {
        marginLeft: 6,
        fontSize: 12,
        fontWeight: '600',
    },
    scrollContent: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    browseAll: {
        fontSize: 14,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
    },
    courseCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: 120,
    },
    courseContent: {
        padding: 16,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    progressText: {
        fontSize: 14,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    emptyCard: {
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        marginTop: 16,
    },
});
