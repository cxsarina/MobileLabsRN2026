import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password) {
            return Alert.alert("Помилка", "Заповніть всі поля");
        }
        if (password !== confirmPassword) {
            return Alert.alert("Помилка", "Паролі не співпадають");
        }
        if (password.length < 6) {
            return Alert.alert("Помилка", "Пароль має бути не менше 6 символів");
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            let message = "Щось пішло не так";
            if (error.code === 'auth/email-already-in-use') message = "Ця пошта вже зайнята";
            if (error.code === 'auth/invalid-email') message = "Невірний формат пошти";
            Alert.alert("Помилка реєстрації", message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Створення акаунту</Text>
            <Text style={styles.subtitle}>Заповніть дані, щоб почати</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="example@mail.com" 
                    value={email} 
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Пароль</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Мінімум 6 символів" 
                    value={password} 
                    onChangeText={setPassword}
                    secureTextEntry 
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Підтвердження пароля</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Повторіть пароль" 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword}
                    secureTextEntry 
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>Вже є акаунт? <Text style={{fontWeight: 'bold'}}>Увійти</Text></Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { 
        backgroundColor: '#f5f5f5', 
        padding: 15, 
        borderRadius: 12, 
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee'
    },
    button: { 
        backgroundColor: '#007AFF', 
        padding: 18, 
        borderRadius: 12, 
        alignItems: 'center', 
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    linkText: { color: '#007AFF', textAlign: 'center', marginTop: 20, fontSize: 15 }
});