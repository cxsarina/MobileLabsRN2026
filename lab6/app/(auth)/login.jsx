import { useRouter } from 'expo-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) return Alert.alert("Помилка", "Заповніть всі поля");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert("Помилка входу", "Невірна пошта або пароль");
        }
    };

    const handleResetPassword = async () => {
        if (!email) return Alert.alert("Помилка", "Введіть email у поле вище для скидання пароля");
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert("Успіх", "Посилання для відновлення пароля надіслано на вашу пошту!");
        } catch (error) {
            Alert.alert("Помилка", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>З поверненням!</Text>
            <Text style={styles.subtitle}>Увійдіть у свій акаунт</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Електронна пошта</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="example@mail.com" 
                    value={email} 
                    onChangeText={setEmail} 
                    autoCapitalize="none" 
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Пароль</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Ваш пароль" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry 
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResetPassword}>
                <Text style={styles.forgotText}>Забули пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.linkText}>Немає акаунту? <Text style={{fontWeight: 'bold'}}>Зареєструватися</Text></Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 20, borderRadius: 8 },
    button: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    forgotText: { color: '#007AFF', textAlign: 'center', marginTop: 15, fontSize: 14 },
    linkText: { marginTop: 20, color: '#007AFF', textAlign: 'center', fontSize: 16 },
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
});