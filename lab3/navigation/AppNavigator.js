import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Вбудовані іконки Expo
import { useGame } from '../context/GameContext';

import GameScreen from '../screens/GameScreen';
import TasksScreen from '../screens/TasksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { colors, theme } = useGame(); // Беремо кольори та назву теми

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Стилізація хедера (верхня панель)
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 0, // прибираємо тінь на Android
          shadowOpacity: 0, // прибираємо тінь на iOS
        },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },

        // Стилізація футера (нижня панель навігації)
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
     tabBarActiveTintColor: '#8b5cf6', // Фіолетовий активний колір
    tabBarInactiveTintColor: theme === 'light' ? '#9ca3af' : '#4b5563',
        
        // Додаємо привабливі іконки
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Гра') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Завдання') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'Налаштування') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size + 4} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Гра" component={GameScreen} />
      <Tab.Screen name="Завдання" component={TasksScreen} />
      <Tab.Screen name="Налаштування" component={SettingsScreen} />
    </Tab.Navigator>
  );
}