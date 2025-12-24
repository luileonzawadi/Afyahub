import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { Card } from '../../components/Card';
import Button from '../../components/Button';

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
        try {
            const response = await api.get('/forum/topics');
            setTopics(response.data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTopic = () => {
        Alert.alert('Create Topic', 'Topic creation feature coming soon!');
    };

    const renderTopic = ({ item }: { item: Topic }) => (
        <TouchableOpacity
            style={styles.topicCard}
            onPress={() => router.push(`/forum-topic?id=${item.id}`)}
        >
            <Card>
                <Text style={styles.topicTitle}>{item.title}</Text>
                <Text style={styles.topicContent} numberOfLines={2}>
                    {item.excerpt}
                </Text>
                <View style={styles.topicMeta}>
                    <Text style={styles.metaText}>By {item.author}</Text>
                    <Text style={styles.metaText}>
                        <FontAwesome name="comment" size={12} /> {item.commentsCount}
                    </Text>
                    <Text style={styles.metaText}>
                        {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
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
                        <FontAwesome name="comments" size={40} color={Colors.textSecondary} />
                        <Text style={styles.emptyText}>No discussions yet</Text>
                        <Text style={styles.emptySubtext}>Be the first to start a conversation!</Text>
                    </View>
                }
            />
            <TouchableOpacity style={styles.fab} onPress={handleCreateTopic}>
                <FontAwesome name="plus" size={20} color="#fff" />
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
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    newTopicBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    list: {
        padding: 16,
    },
    topicCard: {
        marginBottom: 12,
    },
    topicTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 8,
    },
    topicContent: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 12,
        lineHeight: 20,
    },
    topicMeta: {
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
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});