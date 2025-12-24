import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';

export default function AppLayout() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/auth/login" />;
    }

    return (
        <Stack>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </Stack>
    );
}
