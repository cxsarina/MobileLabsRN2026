import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { COLORS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ onNavigate }) => {
  const [storageInfo, setStorageInfo] = useState(null);

  useEffect(() => {
    getStorageStats();
  }, []);

  const getStorageStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      setStorageInfo({ free: (free / (1024 ** 3)).toFixed(2) });
    } catch (e) {
      setStorageInfo({ free: "0" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="folder-open" size={60} color={COLORS.primary} />
          <Text style={styles.title}>File Manager</Text>
          <Text style={styles.subtitle}>Школьна Арина ІПЗ-22-4</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Ionicons name="pie-chart-outline" size={20} color={COLORS.secondaryText} />
            <Text style={styles.statsTitle}>Пам'ять пристрою</Text>
          </View>
          
          {storageInfo ? (
            <View style={styles.statsRow}>
              <Text style={styles.infoText}>Вільний простір:</Text>
              <Text style={styles.infoValue}>{storageInfo.free} GB</Text>
            </View>
          ) : (
            <Text style={styles.loading}>Отримання даних...</Text>
          )}
          <Text style={styles.hint}>* Доступ до повного обсягу обмежено системою</Text>
        </View>

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={onNavigate}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Відкрити сховище</Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: SPACING.xl, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.darkText, marginTop: 10 },
  subtitle: { fontSize: 16, color: COLORS.gray, fontWeight: '500' },
  statsCard: { 
    backgroundColor: COLORS.white, 
    padding: SPACING.l, 
    borderRadius: 20, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    marginBottom: 40 
  },
  statsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.m },
  statsTitle: { fontSize: 16, fontWeight: '600', color: COLORS.secondaryText, marginLeft: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoText: { fontSize: 16, color: COLORS.gray },
  infoValue: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  hint: { fontSize: 11, color: COLORS.gray, marginTop: SPACING.m, fontStyle: 'italic' },
  loading: { color: COLORS.gray, textAlign: 'center' },
  mainButton: { 
    backgroundColor: COLORS.primary, 
    flexDirection: 'row', 
    padding: SPACING.l, 
    borderRadius: 15, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10
  },
  buttonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 }
});

export default HomeScreen;