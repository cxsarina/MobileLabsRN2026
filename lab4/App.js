import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FileManagerScreen from './screens/FileManagerScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {currentScreen === 'Home' ? (
        <HomeScreen onNavigate={() => setCurrentScreen('Files')} />
      ) : (
        <FileManagerScreen onBack={() => setCurrentScreen('Home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});