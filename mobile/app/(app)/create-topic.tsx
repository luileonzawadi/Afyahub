import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import { Card } from '../../components/Card';

export default function CreateTopic() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const categories = ['General', 'Support & Care', 'Education', 'Community'];

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await api.post('/forum/topics', {
                title: title.trim(),
                content: content.trim(),
                category
            });
            Alert.alert('Success', 'Topic created successfully!');
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to create topic');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="arrow-left" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Topic</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.form}>
                <Card style={styles.formCard}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter topic title..."
                        placeholderTextColor={Colors.textSecondary}
                    />

                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryContainer}>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryBtn,
                                    category === cat && styles.categoryBtnActive
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    category === cat && styles.categoryTextActive
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Content</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={content}
                        onChangeText={setContent}
                        placeholder="Write your topic content..."
                        placeholderTextColor={Colors.textSecondary}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={[styles.submitBtn, loading && styles.disabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.submitText}>
                            {loading ? "Creating..." : "Create Topic"}
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </ScrollView>
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    form: {
        padding: 16,
    },
    formCard: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: Colors.text,
        backgroundColor: Colors.background,
    },
    textArea: {
        height: 120,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.background,
    },
    categoryBtnActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    categoryText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    categoryTextActive: {
        color: '#fff',
    },
    submitBtn: {
        marginTop: 24,
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        opacity: 0.6,
    },
});