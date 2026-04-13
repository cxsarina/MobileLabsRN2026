import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { mainStyles } from '../styles/mainstyles';

export default function HomeScreen() {
  const news = [
    { id: 1, title: 'Заголовок новини', date: '13.04.2026', text: 'Короткий текст новини...' },
    { id: 2, title: 'Заголовок новини', date: '13.04.2026', text: 'Короткий текст новини...' },
    { id: 3, title: 'Заголовок новини', date: '13.04.2026', text: 'Короткий текст новини...' },
    { id: 4, title: 'Заголовок новини', date: '13.04.2026', text: 'Короткий текст новини...' },
    { id: 5, title: 'Заголовок новини', date: '13.04.2026', text: 'Короткий текст новини...' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={mainStyles.container}>
        <Text style={mainStyles.headerText}>Новини</Text>
        {news.map(item => (
          <View key={item.id} style={styles.newsBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={mainStyles.footer}>
        <Text style={mainStyles.footerText}>Школьна Арина Леонідівна, ІПЗ-22-4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsBox: { marginBottom: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  title: { fontSize: 18, fontWeight: 'bold' },
  date: { color: 'gray', fontSize: 12, marginVertical: 4 }
});