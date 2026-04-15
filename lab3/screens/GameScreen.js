import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import ClickableObject from '../components/ClickableObject';
import InfoCard from '../components/InfoCard';

export default function GameScreen() {
  const { score, colors } = useGame();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.fixedArea}>
        <View style={styles.header}>
          <Text style={[styles.label, { color: colors.text }]}>SCORE</Text>
          <Text style={[styles.score, { color: colors.text }]}>{score}</Text>
        </View>

        <View style={styles.clickerZone}>
          <ClickableObject />
        </View>
      </View>

      <View style={styles.scrollArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
        >
          <InfoCard />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedArea: {
    height: '65%', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  scrollArea: {
    flex: 1, 
  },
  header: { alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 14, letterSpacing: 4, opacity: 0.5, fontWeight: 'bold' },
  score: { fontSize: 80, fontWeight: '900' },
  clickerZone: { flex: 1, justifyContent: 'center' }
});