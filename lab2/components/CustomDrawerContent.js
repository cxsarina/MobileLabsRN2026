import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff' }}>
      
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: 'https://picsum.photos/id/64/200/200' }}
          style={styles.avatar} 
        />
        <Text style={styles.userName}>Школьна Арина Леонідівна</Text>
        <Text style={styles.userGroup}>Група: ІПЗ-22-4</Text>
      </View>

      {/* 2. Стандартні пункти меню (Новини та Контакти) */}
      <View style={styles.menuItemsContainer}>
        <DrawerItemList {...props} />
      </View>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userGroup: {
    color: '#d1e7ff',
    fontSize: 14,
    marginTop: 4,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
});