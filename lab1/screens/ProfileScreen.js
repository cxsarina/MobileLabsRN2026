import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { mainStyles } from '../styles/mainstyles';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleRegister = () => {
    if (!email || !password || !surname || !firstName) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Помилка", "Паролі не збігаються!");
      return;
    }

    console.log("Дані передано:", { email, surname, firstName });
    
    Alert.alert(
      "Успіх", 
      `Користувача ${firstName} ${surname} успішно зареєстровано!`,
      [{ text: "OK", onPress: () => clearForm() }]
    );
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSurname('');
    setFirstName('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={mainStyles.container}>
        <Text style={styles.registrationTitle}>Реєстрація</Text>

        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput 
          style={mainStyles.input} 
          value={email}
          onChangeText={setEmail}
          placeholder="example@ztu.edu.ua"
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput 
          style={mainStyles.input} 
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} 
        />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput 
          style={mainStyles.input} 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true} 
        />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput 
          style={mainStyles.input} 
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput 
          style={mainStyles.input} 
          value={firstName}
          onChangeText={setFirstName}
        />

        <TouchableOpacity style={mainStyles.button} onPress={handleRegister}>
          <Text style={mainStyles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={mainStyles.footer}>
        <Text style={mainStyles.footerText}>Школьна Арина Леонідівна, ІПЗ-22-4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registrationTitle: { fontSize: 28, textAlign: 'center', marginVertical: 20, color: '#000' },
  label: { fontSize: 14, marginBottom: 5, color: '#333', fontWeight: '500' }
});