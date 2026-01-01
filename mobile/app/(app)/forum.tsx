import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { Card } from '../../components/Card';

interface Topic {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    createdAt: string;
    commentsCount: number;
    votesCount: number;
}

export default function Forum() {
    const router = useRouter();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        // Simulated API call
        setTopics([{
            id: 1,
            title: 'Welcome to the Community',
            excerpt: 'Introduce yourself and connect with others. We are glad to have you here!',
            category: 'General',
            author: 'Admin',
            createdAt: new Date().toISOString(),
            commentsCount: 5,
            votesCount: 10
        },
        {
            id: 2,
            title: 'Q&A: Module 1',
            excerpt: 'Post your questions regarding the first module about HIV fundamentals.',
            category: 'Coursework',
            author: 'Instructor Sarah',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            commentsCount: 12,
            votesCount: 24
        }]);
        setLoading(false);
    };

    const handleCreateTopic = () => {
        router.push('/(app)/create-topic');
    };

    const renderTopic = ({ item }: { item: Topic }) => (
        <TouchableOpacity
            onPress={() => router.push(`/forum-topic?id=${item.id}`)}
            activeOpacity={0.9}
        >
            <Card style={styles.topicCard} variant="elevated">
                <View style={styles.topicHeader}>
                    <Text style={styles.topicCategory}>{item.category}</Text>
                    <Text style={styles.topicDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.topicTitle}>{item.title}</Text>
                <Text style={styles.topicContent} numberOfLines={2}>
                    {item.excerpt}
                </Text>
                <View style={styles.divider} />
                <View style={styles.topicMeta}>
                    <View style={styles.metaItem}>
                        <FontAwesome name="user" size={12} color={Colors.textSecondary} />
                        <Text style={styles.metaText}>{item.author}</Text>
                    </View>
                    <View style={styles.metaRight}>
                        <View style={styles.metaItem}>
                            <FontAwesome name="comment" size={12} color={Colors.primary} />
                            <Text style={[styles.metaText, { color: Colors.primary }]}>{item.commentsCount}</Text>
                        </View>
                        <View style={[styles.metaItem, { marginLeft: Layout.spacing.m }]}>
                            <FontAwesome name="thumbs-up" size={12} color={Colors.secondary} />
                            <Text style={[styles.metaText, { color: Colors.secondary }]}>{item.votesCount}</Text>
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
                <Text style={styles.headerTitle}>Community Forum</Text>
                <Text style={styles.headerSubtitle}>Discuss and learn together</Text>
            </View>

            <FlatList
                data={topics}
                renderItem={renderTopic}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <FontAwesome name="comments" size={48} color={Colors.border} />
                        <Text style={styles.emptyText}>No discussions yet</Text>
                        <Text style={styles.emptySubtext}>Be the first to start a conversation!</Text>
                    </View>
                }
            />
            <TouchableOpacity style={styles.fab} onPress={handleCreateTopic} activeOpacity={0.8}>
                <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
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
        marginBottom: Layout.spacing.s,
    },
    list: {
        padding: Layout.spacing.m,
        paddingTop: Layout.spacing.l,
    },
    topicCard: {
        marginBottom: Layout.spacing.m,
        padding: Layout.spacing.m,
    },
    topicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    topicCategory: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.primary,
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    topicDate: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    topicTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 6,
    },
    topicContent: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: Layout.spacing.m,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginBottom: Layout.spacing.s,
    },
    topicMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    fab: {
        position: 'absolute',
        bottom: Layout.spacing.l,
        right: Layout.spacing.l,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...Layout.shadows.large,
    },
});