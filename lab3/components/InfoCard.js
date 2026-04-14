import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function InfoCard() {
  const { colors } = useGame();

  const infoItems = [
    { label: 'Tap', points: '+1 point', color: '#E0F2FE', icon: '☝️' },
    { label: 'Double-tap', points: '+2 points', color: '#FFEDD5', icon: '✌️' },
    { label: 'Long-press (3s)', points: '+5 points', color: '#F3E8FF', icon: '✋' },
    { label: 'Swipe', points: '+1-10 random points', color: '#FEE2E2', icon: '↔️' },
    { label: 'Pinch', points: '+3 points', color: '#DCFCE7', icon: '🤏' },
  ];

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      {infoItems.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: item.color }]}>
            <Text style={{ fontSize: 12 }}>{item.icon}</Text>
          </View>
          <Text style={[styles.text, { color: colors.text }]}>
            <Text style={{ fontWeight: 'bold' }}>{item.label}:</Text> {item.points}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 25, width: '90%', elevation: 3 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconBox: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  text: { fontSize: 13 }
});