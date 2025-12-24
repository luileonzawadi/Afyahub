import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { Card } from '../../components/Card';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const { user } = useAuth();
    const [progress, setProgress] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            // Fetch progress
            const progressRes = await api.get('/users/progress');
            setProgress(progressRes.data);
        } catch (error) {
            console.log('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.username}>{user?.name || 'Learner'}!</Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.sectionTitle}>Overview</Text>
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <FontAwesome name="book" size={24} color={Colors.primary} />
                        <Text style={styles.statValue}>{progress?.enrolledCourses || 0}</Text>
                        <Text style={styles.statLabel}>Enrolled</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <FontAwesome name="check-circle" size={24} color={Colors.success} />
                        <Text style={styles.statValue}>{progress?.completedModules || 0}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <FontAwesome name="trophy" size={24} color="#eab308" />
                        <Text style={styles.statValue}>{progress?.certificates || 0}</Text>
                        <Text style={styles.statLabel}>Certificates</Text>
                    </Card>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>My Courses</Text>
                    <TouchableOpacity onPress={() => router.push('/course-list')}>
                        <Text style={styles.browseAll}>Browse All</Text>
                    </TouchableOpacity>
                </View>
                {progress?.enrolledCoursesData?.length > 0 ? (
                    progress.enrolledCoursesData.map((course: any) => (
                        <TouchableOpacity
                            key={course.id}
                            onPress={() => router.push(`/course-detail?id=${course.id}`)}
                        >
                            <Card style={styles.courseCard}>
                                <View style={styles.courseHeader}>
                                    <Text style={styles.courseTitle}>{course.title}</Text>
                                    <Text style={styles.progressText}>{course.progress || 0}%</Text>
                                </View>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: `${course.progress || 0}%` }]} />
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Card style={styles.emptyCard}>
                        <FontAwesome name="book" size={40} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>No enrolled courses yet</Text>
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
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    greeting: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
    },
    logoutBtn: {
        padding: 8,
    },
    scrollContent: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: Colors.text,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    browseAll: {
        color: Colors.primary,
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
        padding: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        color: Colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    courseCard: {
        marginBottom: 12,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    progressText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: Colors.border,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    emptyCard: {
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        marginTop: 16,
        color: Colors.textSecondary,
    },
});
