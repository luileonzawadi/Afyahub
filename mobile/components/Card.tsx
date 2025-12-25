import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../constants/Colors';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style }: CardProps) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        maxWidth: '100%',
        flexShrink: 1,
    },
});
