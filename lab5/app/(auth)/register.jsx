import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register } = useAuth();
  const router = useRouter();

 const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Заповніть всі поля");
      return;
    }
    if (password !== confirmPassword) {
      alert("Паролі не співпадають");
      return;
    }

    const success = register(email, password, name);
    if (success) {
      // Після реєстрації повертаємось на логін
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} placeholder="Введіть ваше ім'я" value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="example@mail.com" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} placeholder="********" secureTextEntry value={password} onChangeText={setPassword} />

      <Text style={styles.label}>Підтвердження паролю</Text>
      <TextInput style={styles.input} placeholder="********" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      
      <Button title="Зареєструватися" onPress={handleRegister} />
      
      <Link href="/login" style={styles.link}>
        Вже є акаунт? Увійти
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, marginBottom: 20, borderRadius: 8 },
  link: { marginTop: 20, color: '#007AFF', textAlign: 'center', fontSize: 16 },
});