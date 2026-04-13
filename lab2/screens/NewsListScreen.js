import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  RefreshControl, 
  StyleSheet, 
  TouchableOpacity // Додано для обробки натискань на картку
} from 'react-native';
import { DATA } from '../data/mockData';
import { mainStyles } from '../styles/mainStyles';

// navigation додано як параметр для переходу між екранами
export default function NewsListScreen({ navigation }) {
  const [newsData, setNewsData] = useState(DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // 1. Pull-to-Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNewsData([...DATA]); // Імітація оновлення
      setRefreshing(false);
    }, 2000);
  }, []);

  // 2. Infinite Scroll
  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const moreData = DATA.map(item => ({ ...item, id: Math.random().toString() }));
      setNewsData(prev => [...prev, ...moreData]);
      setLoadingMore(false);
    }, 1500);
  };

  // 3. Допоміжні компоненти для FlatList
  const renderHeader = () => (
    <Text style={mainStyles.headerText}>Стрічка новин Житомирської Політехніки</Text>
  );

  const renderFooter = () => loadingMore ? (
    <View style={{ padding: 20 }}><ActivityIndicator size="small" color="#007AFF" /></View>
  ) : null;

  const renderSeparator = () => <View style={{ height: 15 }} />;

  const renderItem = ({ item }) => (
    // TouchableOpacity замість View для клікабельності
    <TouchableOpacity 
      style={[mainStyles.card, { marginHorizontal: 15 }]}
      // Перехід на екран Details із передачею об'єкта item як параметра
      onPress={() => navigation.navigate('Details', { item })} 
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={mainStyles.cardImage} />
      <View style={mainStyles.cardContent}>
        <Text style={mainStyles.cardTitle}>{item.title}</Text>
        <Text style={mainStyles.cardDescription} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={newsData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      // Візуальні елементи
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter} 
      ItemSeparatorComponent={renderSeparator} 
      // Оновлення та скрол
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onEndReached={handleLoadMore} //Викликає функцію завантаження
      onEndReachedThreshold={0.5} // Коли користувач досягає 50% від кінця, викликається onEndReached
      // Оптимізація
      initialNumToRender={5}    // Скільки елементів рендерити спочатку
      maxToRenderPerBatch={10}  // Скільки додавати за раз при скролі
      windowSize={3}           // кількість екранів поза видимістю
    />
  );
}