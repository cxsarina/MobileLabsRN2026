import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS } from '../../../constants/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams(); 
  
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не знайдено!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Stack.Screen дозволяє змінити заголовок верхньої панелі */}
      <Stack.Screen options={{ title: product.name, headerShown: true }} />
      
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', fontWeight: '600', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 24, color: '#444' },
});