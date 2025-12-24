import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { Card } from '../../components/Card';

interface Course {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
}

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [courses, searchQuery]);

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses/');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderCourse = ({ item }: { item: Course }) => (
        <TouchableOpacity
            style={styles.courseCard}
            onPress={() => router.push(`/course-detail?id=${item.id}`)}
        >
            <Card>
                <Image
                    source={{ uri: item.image || 'https://via.placeholder.com/300x200' }}
                    style={styles.courseImage}
                />
                <View style={styles.courseContent}>
                    <Text style={styles.courseTitle}>{item.title}</Text>
                    <Text style={styles.courseDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <View style={styles.courseMeta}>
                        <Text style={styles.metaText}>
                            <FontAwesome name="clock-o" size={12} /> {item.duration}
                        </Text>
                        <Text style={styles.metaText}>
                            <FontAwesome name="graduation-cap" size={12} /> {item.level}
                        </Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>All Courses</Text>
                <Text style={styles.headerSubtitle}>Explore our comprehensive HIV/AIDS education courses</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBox}>
                    <FontAwesome name="search" size={16} color={Colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.textSecondary}
                    />
                </View>
            </View>

            <FlatList
                data={filteredCourses}
                renderItem={renderCourse}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <FontAwesome name="book" size={40} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No courses found' : 'No courses available'}
                        </Text>
                        <Text style={styles.emptySubtext}>
                            {searchQuery ? 'Try a different search term' : 'Check back later'}
                        </Text>
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 24,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: Colors.text,
    },
    list: {
        padding: 16,
    },
    courseCard: {
        marginBottom: 16,
    },
    courseImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    courseContent: {
        padding: 16,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    courseDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 12,
        lineHeight: 20,
    },
    courseMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaText: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    empty: {
        alignItems: 'center',
        padding: 48,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});