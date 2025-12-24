import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    enrolled?: boolean;
}

interface Module {
    id: number;
    title: string;
    description: string;
    completed?: boolean;
}

export default function CourseDetail() {
    const { id } = useLocalSearchParams();
    const { user } = useAuth();
    const router = useRouter();
    const [course, setCourse] = useState<Course | null>(null);
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCourse();
            fetchModules();
        }
    }, [id]);

    const fetchCourse = async () => {
        try {
            const response = await api.get(`/courses/${id}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course:', error);
            Alert.alert('Error', 'Failed to load course');
        }
    };

    const fetchModules = async () => {
        try {
            const response = await api.get(`/courses/${id}/modules`);
            setModules(response.data);
        } catch (error) {
            console.error('Error fetching modules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            router.replace('/auth/login');
            return;
        }
        setEnrolling(true);
        try {
            await api.post(`/courses/${id}/enroll`);
            Alert.alert('Success', 'Enrolled successfully!');
            // Refresh course data
            fetchCourse();
        } catch (error) {
            console.error('Enrollment failed:', error);
            Alert.alert('Error', 'Failed to enroll');
        } finally {
            setEnrolling(false);
        }
    };

    const handleStartCourse = () => {
        if (modules.length > 0) {
            router.push(`/module-viewer?courseId=${id}&moduleId=${modules[0].id}`);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!course) {
        return (
            <View style={styles.center}>
                <Text>Course not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: course.image || 'https://via.placeholder.com/400x200' }}
                style={styles.heroImage}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.description}>{course.description}</Text>

                <View style={styles.meta}>
                    <Text style={styles.metaText}>
                        <FontAwesome name="book" size={14} /> {modules.length} Modules
                    </Text>
                    <Text style={styles.metaText}>
                        <FontAwesome name="clock-o" size={14} /> {course.duration}
                    </Text>
                    <Text style={styles.metaText}>
                        <FontAwesome name="graduation-cap" size={14} /> {course.level}
                    </Text>
                </View>

                {course.enrolled ? (
                    <Button
                        title="Start Course"
                        onPress={handleStartCourse}
                        style={styles.actionButton}
                    />
                ) : (
                    <Button
                        title={enrolling ? "Enrolling..." : "Enroll Now"}
                        onPress={handleEnroll}
                        disabled={enrolling}
                        style={styles.actionButton}
                    />
                )}

                <Text style={styles.sectionTitle}>Course Modules</Text>
                {modules.map((module, index) => (
                    <Card key={module.id} style={styles.moduleCard}>
                        <View style={styles.moduleHeader}>
                            <Text style={styles.moduleNumber}>{index + 1}</Text>
                            <View style={styles.moduleInfo}>
                                <Text style={styles.moduleTitle}>{module.title}</Text>
                                <Text style={styles.moduleDescription}>{module.description}</Text>
                            </View>
                            {module.completed && (
                                <FontAwesome name="check-circle" size={20} color={Colors.success} />
                            )}
                        </View>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 16,
        lineHeight: 24,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    metaText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    actionButton: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    moduleCard: {
        marginBottom: 12,
    },
    moduleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moduleNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 12,
    },
    moduleInfo: {
        flex: 1,
    },
    moduleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    moduleDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
});