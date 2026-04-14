import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function TasksScreen() {
  const { tasks, colors } = useGame();

  const renderItem = ({ item }) => {
    const progress = Math.min(item.current / item.target, 1);
    
    return (
      <View style={[styles.taskCard, { backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <Text style={[styles.taskTitle, { color: colors.text }]}>{item.title}</Text>
          {item.completed && <Text style={styles.doneBadge}>ГОТОВО</Text>}
        </View>
        
        {/* Прогрес-бар */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{item.current} / {item.target}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  taskCard: { padding: 15, borderRadius: 15, marginBottom: 15, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  taskTitle: { fontWeight: '600', fontSize: 16 },
  doneBadge: { color: '#10b981', fontWeight: 'bold' },
  progressBg: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' },
 progressFill: { 
  height: '100%', 
  backgroundColor: '#8b5cf6' 
},
  progressText: { fontSize: 12, color: '#9ca3af', marginTop: 5, textAlign: 'right' }
});