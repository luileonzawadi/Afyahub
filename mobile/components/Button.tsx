import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/Colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: any;
    textStyle?: any;
    variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle,
    variant = 'primary'
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondary;
            case 'outline':
                return styles.outline;
            default:
                return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'outline':
                return styles.outlineText;
            default:
                return styles.buttonText;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                disabled && styles.disabled,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    outlineText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Button;