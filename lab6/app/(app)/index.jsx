import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { auth, db } from '../../firebaseConfig';

export default function Home() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.uid) return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setName(data.name || '');
                    setAge(data.age || '');
                    setCity(data.city || '');
                }
            } catch (error) {
                console.error("Помилка завантаження даних:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [user]);

    const handleSave = async () => {
        if (!name || !age || !city) return Alert.alert("Помилка", "Заповніть усі поля профілю");
        setSaving(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                name, age, city, email: user.email, updatedAt: new Date().toISOString()
            });
            Alert.alert("Успіх", "Профіль успішно оновлено!");
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося зберегти дані");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.prompt(
            "Видалення акаунта",
            "Для безпеки введіть ваш пароль:",
            [
                { text: "Скасувати", style: "cancel" },
                { 
                    text: "Видалити назавжди", 
                    style: "destructive",
                    onPress: async (password) => {
                        try {
                            const credential = EmailAuthProvider.credential(user.email, password);
                            await reauthenticateWithCredential(auth.currentUser, credential);
                            await deleteDoc(doc(db, "users", user.uid));
                            await deleteUser(auth.currentUser);
                            Alert.alert("Видалено", "Ваш обліковий запис видалено.");
                        } catch (error) {
                            Alert.alert("Помилка", "Невірний пароль або помилка системи.");
                        }
                    }
                }
            ],
            "secure-text"
        );
    };

    if (loading) return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#28a745" />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Налаштування профілю</Text>
                
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ваше ім'я</Text>
                    <TextInput 
                        style={styles.input} 
                        value={name} 
                        onChangeText={setName} 
                        placeholder="Ім'я" 
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Вік</Text>
                    <TextInput 
                        style={styles.input} 
                        value={age} 
                        onChangeText={setAge} 
                        placeholder="20" 
                        keyboardType="numeric" 
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Місто</Text>
                    <TextInput 
                        style={styles.input} 
                        value={city} 
                        onChangeText={setCity} 
                        placeholder="Київ" 
                        placeholderTextColor="#aaa"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSave} 
                    disabled={saving}
                >
                    <Text style={styles.buttonText}>
                        {saving ? "Збереження..." : "Зберегти зміни"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.signOutButton} onPress={() => signOut(auth)}>
                    <Text style={styles.signOutText}>Вийти з системи</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={styles.deleteText}>Видалити акаунт</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff',paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
    },
    container: {flexGrow: 1, padding: 25, backgroundColor: '#fff' },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 25, 
        color: '#1a1a1a',
        textAlign: 'center' 
    },
    inputGroup: {marginBottom: 15},
    label: { 
        fontSize: 14, 
        color: '#666', 
        marginBottom: 6, 
        fontWeight: '500' 
    },
    input: { 
        backgroundColor: '#f9f9f9', 
        padding: 15, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#eee', 
        fontSize: 16,
        color: '#1a1a1a'
    },
    saveButton: { 
        backgroundColor: '#007AFF', 
        padding: 16, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold' },
    divider: {height: 1, backgroundColor: '#eee', marginVertical: 30},
    signOutButton: {padding: 10, alignItems: 'center'},
    signOutText: {color: '#007AFF', fontSize: 16,fontWeight: '500'},
    deleteButton: { marginTop: 10, padding: 10, alignItems: 'center' },
    deleteText: { color: '#dc3545', fontSize: 14, fontWeight: '500' }
});