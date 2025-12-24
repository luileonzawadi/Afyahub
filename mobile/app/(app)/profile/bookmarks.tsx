import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../constants/Colors';
import { Card } from '../../../components/Card';
import Button from '../../../components/Button';

interface Bookmark {
    id: string;
    type: 'course' | 'resource';
    title: string;
    description: string;
    progress?: number;
    dateAdded: string;
}

export default function Bookmarks() {
    const router = useRouter();
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'resources'>('all');

    useEffect(() => {
        // TODO: Fetch bookmarks from API
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            // Mock data for now
            const mockBookmarks: Bookmark[] = [
                {
                    id: '1',
                    type: 'course',
                    title: 'Introduction to React Native',
                    description: 'Learn the basics of mobile app development',
                    progress: 75,
                    dateAdded: '2024-01-15',
                },
                {
                    id: '2',
                    type: 'resource',
                    title: 'JavaScript Best Practices',
                    description: 'Essential coding guidelines and patterns',
                    dateAdded: '2024-01-10',
                },
            ];
            setBookmarks(mockBookmarks);
        } catch (error) {
            console.error('Failed to load bookmarks:', error);
        }
    };

    const filteredBookmarks = bookmarks.filter(bookmark => {
        if (activeTab === 'all') return true;
        return bookmark.type === activeTab.slice(0, -1); // Remove 's' from 'courses'/'resources'
    });

    const renderBookmark = ({ item }: { item: Bookmark }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.type === 'course') {
                    router.push(`/course-detail?id=${item.id}`);
                } else {
                    // Handle resource navigation
                    console.log('Navigate to resource:', item.id);
                }
            }}
        >
            <Card style={styles.bookmarkCard}>
                <View style={styles.bookmarkContent}>
                    <View style={styles.bookmarkIcon}>
                        <FontAwesome
                            name={item.type === 'course' ? 'book' : 'file-text-o'}
                            size={20}
                            color={Colors.primary}
                        />
                    </View>
                    <View style={styles.bookmarkDetails}>
                        <Text style={styles.bookmarkTitle}>{item.title}</Text>
                        <Text style={styles.bookmarkDescription}>{item.description}</Text>
                        <Text style={styles.bookmarkDate}>
                            Added {new Date(item.dateAdded).toLocaleDateString()}
                        </Text>
                    </View>
                    {item.progress !== undefined && (
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>{item.progress}%</Text>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${item.progress}%` }
                                    ]}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </Card>
        </TouchableOpacity>
    );

    const tabs = [
        { key: 'all', label: 'All', count: bookmarks.length },
        { key: 'courses', label: 'Courses', count: bookmarks.filter(b => b.type === 'course').length },
        { key: 'resources', label: 'Resources', count: bookmarks.filter(b => b.type === 'resource').length },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Bookmarks</Text>
                <View style={styles.headerRight} />
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
                data={filteredBookmarks}
                renderItem={renderBookmark}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.bookmarksList}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <FontAwesome name="bookmark-o" size={48} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>No bookmarks yet</Text>
                        <Text style={styles.emptySubtext}>
                            Save courses and resources to access them quickly
                        </Text>
                        <Button
                            title="Browse Courses"
                            onPress={() => router.push('/course-list')}
                            style={styles.browseButton}
                        />
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
    bookmarksList: {
        padding: 16,
    },
    bookmarkCard: {
        marginBottom: 12,
    },
    bookmarkContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookmarkIcon: {
        width: 40,
        alignItems: 'center',
    },
    bookmarkDetails: {
        flex: 1,
        marginLeft: 12,
    },
    bookmarkTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    bookmarkDescription: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 4,
    },
    bookmarkDate: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    progressContainer: {
        alignItems: 'center',
        marginLeft: 12,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 4,
    },
    progressBar: {
        width: 60,
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
        marginBottom: 24,
    },
    browseButton: {
        minWidth: 150,
    },
});