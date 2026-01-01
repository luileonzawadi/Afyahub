import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
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
        // Simulated API call
        setCourses([{
            id: 1,
            title: 'HIV/AIDS Basics',
            description: 'Learn the fundamentals of HIV/AIDS prevention and care including transmission vectors and safety protocols.',
            image: 'https://via.placeholder.com/300x200/0056D2/FFFFFF?text=HIV+Basics',
            duration: '2 hours',
            level: 'Beginner'
        },
        {
            id: 2,
            title: 'Advanced Prevention',
            description: 'Strategies for preventing transmission in high-risk scenarios.',
            image: 'https://via.placeholder.com/300x200/20B2AA/FFFFFF?text=Prevention',
            duration: '4 hours',
            level: 'Intermediate'
        }]);
        setLoading(false);
    };

    const renderCourse = ({ item }: { item: Course }) => (
        <TouchableOpacity
            onPress={() => router.push(`/course-detail?id=${item.id}`)}
            activeOpacity={0.9}
        >
            <Card style={styles.courseCard} variant="elevated">
                <Image
                    source={{ uri: item.image || 'https://via.placeholder.com/300x200' }}
                    style={styles.courseImage}
                />
                <View style={styles.courseContent}>
                    <Text style={styles.courseTitle}>{item.title}</Text>
                    <Text style={styles.courseDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.courseMeta}>
                        <View style={styles.metaItem}>
                            <FontAwesome name="clock-o" size={14} color={Colors.textSecondary} />
                            <Text style={styles.metaText}>{item.duration}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <FontAwesome name="signal" size={14} color={Colors.textSecondary} />
                            <Text style={styles.metaText}>{item.level}</Text>
                        </View>
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
                <Text style={styles.headerSubtitle}>Explore our comprehensive library</Text>

                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={Colors.textSecondary}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <FontAwesome name="times-circle" size={18} color={Colors.textSecondary} />
                        </TouchableOpacity>
                    )}
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
                        <FontAwesome name="search" size={48} color={Colors.border} />
                        <Text style={styles.emptyText}>
                            {searchQuery ? 'No courses found' : 'No courses available'}
                        </Text>
                        <Text style={styles.emptySubtext}>
                            {searchQuery ? `We couldn't find any courses matching "${searchQuery}"` : 'Check back later for new content'}
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
        backgroundColor: Colors.background,
    },
    header: {
        padding: Layout.spacing.l,
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: Layout.borderRadius.xl,
        borderBottomRightRadius: Layout.borderRadius.xl,
        ...Layout.shadows.small,
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.l,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: Layout.borderRadius.l,
        paddingHorizontal: Layout.spacing.m,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    searchIcon: {
        marginRight: Layout.spacing.s,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
        height: '100%',
    },
    list: {
        padding: Layout.spacing.m,
        paddingTop: Layout.spacing.l,
    },
    courseCard: {
        marginBottom: Layout.spacing.l,
        padding: 0,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: 160,
        backgroundColor: Colors.primaryLight,
    },
    courseContent: {
        padding: Layout.spacing.m,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 6,
    },
    courseDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.m,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginBottom: Layout.spacing.m,
    },
    courseMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: Layout.spacing.l,
    },
    metaText: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginLeft: 6,
        fontWeight: '500',
    },
    empty: {
        alignItems: 'center',
        padding: Layout.spacing.xxl,
        marginTop: Layout.spacing.l,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: Layout.spacing.l,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        maxWidth: '80%',
    },
});