import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: 'elevated' | 'outlined' | 'flat';
}

export const Card = ({ children, style, variant = 'elevated' }: CardProps) => {
    return (
        <View style={[
            styles.card,
            variant === 'elevated' && styles.elevated,
            variant === 'outlined' && styles.outlined,
            variant === 'flat' && styles.flat,
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.l,
        padding: Layout.spacing.m,
        marginBottom: Layout.spacing.m,
        width: '100%',
    },
    elevated: {
        ...Layout.shadows.medium,
    },
    outlined: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
    flat: {
        backgroundColor: 'transparent',
    }
});
