import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  // Отримуємо об'єкт новини з параметрів
  const { item } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  description: { fontSize: 16, color: '#444', lineHeight: 24 }
});