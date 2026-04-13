import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { mainStyles } from '../styles/mainStyles';

const CONTACTS_DATA = [
  {
    title: 'Деканат ФІКТ',
    data: [
      { id: '1', name: 'Декан', info: 'каб. 332, тел. 067-123-45-67' },
      { id: '2', name: 'Заступник декана', info: 'каб. 331, тел. 067-987-65-43' },
    ],
  },
  {
    title: 'Кафедри',
    data: [
      { id: '3', name: 'Кафедра ІПЗ', info: 'каб. 320, pzi@ztu.edu.ua' },
      { id: '4', name: 'Кафедра КН', info: 'каб. 315, kn@ztu.edu.ua' },
    ],
  },
  {
    title: 'Студентська рада',
    data: [
      { id: '5', name: 'Студентський декан', info: 'Instagram: @fict_official' },
      { id: '6', name: 'Стуентський ректор', info: 'каб. ОСС' },
    ],
  },
];

export default function ContactsScreen() {
  
  // renderItem: як виглядає один контакт у списку
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemInfo}>{item.info}</Text>
    </View>
  );

  // renderSectionHeader: як виглядає заголовок кожної групи
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  // ItemSeparatorComponent: лінія між контактами
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={mainStyles.container}>
      <SectionList
        // sections: масив даних із секціями
        sections={CONTACTS_DATA}
        // keyExtractor: унікальний ключ для кожного елемента
        keyExtractor={(item) => item.id}
        // renderItem: функція для відображення елемента
        renderItem={renderItem}
        // renderSectionHeader: функція для відображення заголовка секції
        renderSectionHeader={renderSectionHeader}
        // ItemSeparatorComponent: розділювач між елементами
        ItemSeparatorComponent={renderSeparator}
        // Додаткове налаштування для iOS, щоб заголовки "прилипали" зверху
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 15,
  },
});