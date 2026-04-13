import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { mainStyles } from '../styles/mainstyles';

export default function GalleryScreen() {
  const photos = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/200/300?random=${i}`
  }));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.grid}>
        {photos.map((item) => (
          <View key={item.id} style={styles.photoWrapper}>
            <Image 
              source={{ uri: item.url }} 
              style={styles.image} 
            />
          </View>
        ))}
      </ScrollView>

      {}
      <View style={mainStyles.footer}>
        <Text style={mainStyles.footerText}>Школьна Арина Леонідівна, ІПЗ-22-4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    padding: 10 
  },
  photoWrapper: { 
    width: '45%', 
    height: 150, 
    margin: 8, 
    borderRadius: 12, 
    overflow: 'hidden',
    backgroundColor: '#eee',
    shadowColor: '#000', // Тінь для iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Фото буде заповнювати весь блок
  }
});