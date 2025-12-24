import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../constants/Colors';
import { Card } from '../../../components/Card';
import Button from '../../../components/Button';
import { Input } from '../../../components/Input';

export default function PersonalInfo() {
    const { user, updateUser } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement API call to update user profile
            await updateUser(formData);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            bio: user?.bio || '',
        });
        setIsEditing(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Personal Information</Text>
                <View style={styles.headerRight} />
            </View>

            <View style={styles.content}>
                <Card style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <FontAwesome name="user-circle" size={80} color={Colors.primary} />
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <FontAwesome name="camera" size={16} color={Colors.surface} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        <Input
                            label="Full Name"
                            value={formData.name}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                            editable={isEditing}
                            placeholder="Enter your full name"
                        />

                        <Input
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            editable={isEditing}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />

                        <Input
                            label="Phone"
                            value={formData.phone}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                            editable={isEditing}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />

                        <Input
                            label="Bio"
                            value={formData.bio}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
                            editable={isEditing}
                            placeholder="Tell us about yourself"
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                </Card>

                <View style={styles.actionsContainer}>
                    {isEditing ? (
                        <View style={styles.editActions}>
                            <Button
                                title="Cancel"
                                onPress={handleCancel}
                                variant="outline"
                                style={styles.actionButton}
                            />
                            <Button
                                title="Save Changes"
                                onPress={handleSave}
                                loading={isLoading}
                                style={styles.actionButton}
                            />
                        </View>
                    ) : (
                        <Button
                            title="Edit Profile"
                            onPress={() => setIsEditing(true)}
                            style={styles.editButton}
                        />
                    )}
                </View>
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
    content: {
        padding: 16,
    },
    profileCard: {
        padding: 20,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
    },
    actionsContainer: {
        marginTop: 24,
    },
    editActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
    },
    editButton: {
        width: '100%',
    },
});