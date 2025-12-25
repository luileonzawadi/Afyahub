import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/Card';

export default function AdminDashboard() {
    const { colors } = useTheme();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 1247,
        activeCourses: 12,
        forumPosts: 89,
        completionRate: 78
    });

    const adminActions = [
        { title: 'User Management', icon: 'users', route: '/admin/users', color: '#3498db' },
        { title: 'Course Management', icon: 'book', route: '/admin/courses', color: '#2ecc71' },
        { title: 'Forum Moderation', icon: 'comments', route: '/admin/forum', color: '#e74c3c' },
        { title: 'Analytics', icon: 'chart-bar', route: '/admin/analytics', color: '#f39c12' },
        { title: 'Content Management', icon: 'edit', route: '/admin/content', color: '#9b59b6' },
        { title: 'System Settings', icon: 'cogs', route: '/admin/settings', color: '#34495e' },
    ];

    const recentActivity = [
        { type: 'user', message: 'New user registered: John Doe', time: '2 min ago', icon: 'user-plus' },
        { type: 'course', message: 'Course "HIV Prevention" completed by 5 users', time: '15 min ago', icon: 'graduation-cap' },
        { type: 'forum', message: 'New forum post reported', time: '1 hour ago', icon: 'flag' },
        { type: 'system', message: 'System backup completed', time: '2 hours ago', icon: 'database' },
    ];

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.surface }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Dashboard</Text>
                <TouchableOpacity style={styles.notificationBtn}>
                    <FontAwesome name="bell" size={20} color={colors.primary} />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Stats Overview */}
            <View style={styles.statsContainer}>
                <Card style={styles.statCard}>
                    <FontAwesome name="users" size={24} color="#3498db" />
                    <Text style={[styles.statValue, { color: colors.text }]}>{stats.totalUsers}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Users</Text>
                </Card>
                <Card style={styles.statCard}>
                    <FontAwesome name="book" size={24} color="#2ecc71" />
                    <Text style={[styles.statValue, { color: colors.text }]}>{stats.activeCourses}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Courses</Text>
                </Card>
                <Card style={styles.statCard}>
                    <FontAwesome name="comments" size={24} color="#e74c3c" />
                    <Text style={[styles.statValue, { color: colors.text }]}>{stats.forumPosts}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Forum Posts</Text>
                </Card>
                <Card style={styles.statCard}>
                    <FontAwesome name="chart-line" size={24} color="#f39c12" />
                    <Text style={[styles.statValue, { color: colors.text }]}>{stats.completionRate}%</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completion Rate</Text>
                </Card>
            </View>

            {/* Quick Actions */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
                {adminActions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.actionCard, { backgroundColor: colors.surface }]}
                        onPress={() => Alert.alert(action.title, 'Feature coming soon!')}
                    >
                        <View style={styles.actionIcon}>
                            <FontAwesome name={action.icon} size={20} color={action.color} />
                        </View>
                        <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Recent Activity */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
            <Card style={{ backgroundColor: colors.surface }}>
                {recentActivity.map((activity, index) => (
                    <View key={index} style={[styles.activityItem, index < recentActivity.length - 1 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                        <FontAwesome name={activity.icon} size={16} color={colors.primary} />
                        <View style={styles.activityContent}>
                            <Text style={[styles.activityMessage, { color: colors.text }]}>{activity.message}</Text>
                            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
                        </View>
                    </View>
                ))}
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    notificationBtn: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 12,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 12,
    },
    actionCard: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionTitle: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    activityContent: {
        flex: 1,
        marginLeft: 12,
    },
    activityMessage: {
        fontSize: 14,
        marginBottom: 4,
    },
    activityTime: {
        fontSize: 12,
    },
});