import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import api from '../../services/api';
import Button from '../../components/Button';

interface Module {
    id: number;
    title: string;
    content: string;
    video_url?: string;
    completed?: boolean;
}

export default function ModuleViewer() {
    const { courseId, moduleId } = useLocalSearchParams();
    const router = useRouter();
    const [module, setModule] = useState<Module | null>(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);

    useEffect(() => {
        fetchModule();
    }, [moduleId]);

    const fetchModule = async () => {
        try {
            const response = await api.get(`/courses/${courseId}/modules`);
            const modules = response.data;
            const currentModule = modules.find((m: Module) => m.id == moduleId);
            setModule(currentModule || null);
        } catch (error) {
            console.error('Error fetching module:', error);
            Alert.alert('Error', 'Failed to load module');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!module || module.completed) return;
        setCompleting(true);
        try {
            await api.put(`/courses/${courseId}/modules/${moduleId}/progress`, {
                completed: true
            });
            Alert.alert('Success', 'Module completed!');
            setModule({ ...module, completed: true });
        } catch (error) {
            console.error('Error updating progress:', error);
            Alert.alert('Error', 'Failed to update progress');
        } finally {
            setCompleting(false);
        }
    };

    const handleNext = () => {
        // For now, just go back to course detail
        router.back();
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!module) {
        return (
            <View style={styles.center}>
                <Text>Module not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    {module.title}
                </Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.moduleContent}>
                    {module.content}
                </Text>

                {module.video_url && (
                    <Text style={styles.videoNote}>
                        Video: {module.video_url}
                    </Text>
                )}
            </ScrollView>

            <View style={styles.footer}>
                {module.completed ? (
                    <View style={styles.completed}>
                        <FontAwesome name="check-circle" size={20} color={Colors.success} />
                        <Text style={styles.completedText}>Completed</Text>
                    </View>
                ) : (
                    <Button
                        title={completing ? "Completing..." : "Mark as Complete"}
                        onPress={handleComplete}
                        disabled={completing}
                        style={styles.completeBtn}
                    />
                )}
                <Button
                    title="Next"
                    onPress={handleNext}
                    style={styles.nextBtn}
                />
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    backBtn: {
        padding: 8,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
    },
    placeholder: {
        width: 36,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    moduleContent: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.text,
    },
    videoNote: {
        marginTop: 16,
        fontSize: 14,
        color: Colors.primary,
        fontStyle: 'italic',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    completed: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    completedText: {
        marginLeft: 8,
        fontSize: 16,
        color: Colors.success,
        fontWeight: 'bold',
    },
    completeBtn: {
        marginBottom: 8,
    },
    nextBtn: {
        backgroundColor: Colors.secondary,
    },
});