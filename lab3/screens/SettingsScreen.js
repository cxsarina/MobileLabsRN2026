import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function SettingsScreen() {
  const { theme, toggleTheme, colors } = useGame();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Налаштування</Text>
      
      <TouchableOpacity 
        style={[styles.row, { backgroundColor: colors.card }]} 
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.text }}>Поточна тема:</Text>
        <Text style={styles.themeName}>{theme.toUpperCase()}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Школьна Арина ІПЗ-22-4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    borderRadius: 15,
    alignItems: 'center'
  },
  themeName: { fontWeight: 'bold', color: '#8b5cf6' },
  footer: { textAlign: 'center', marginTop: 50, color: '#9ca3af', fontSize: 12 }
});