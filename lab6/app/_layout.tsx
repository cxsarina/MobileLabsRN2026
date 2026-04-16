import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutNav() {
    const { user, loading } = useAuth() as any;
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/');
        }
    }, [user, loading, segments]);

    return <Slot />;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}