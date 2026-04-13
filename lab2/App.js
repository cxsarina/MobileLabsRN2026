import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 2. Обгортка для жестів

import NewsListScreen from './screens/NewsListScreen';
import DetailsScreen from './screens/DetailsScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import ContactsScreen from './screens/ContactsScreen';
import { mainStyles } from './styles/mainStyles';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={NewsListScreen} 
        options={{ title: 'Стрічка новин' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={({ route }) => ({ title: route.params.item.title })} 
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}> 
        <NavigationContainer>
          
          <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ 
              drawerActiveTintColor: '#007AFF',
              drawerLabelStyle: { marginLeft: -10 } 
            }}
          >
            <Drawer.Screen 
              name="Home" 
              component={HomeStack} 
              options={{ title: 'Новини', headerShown: false }} 
            />
            <Drawer.Screen 
              name="Contacts" 
              component={ContactsScreen} 
              options={{ title: 'Контакти' }} 
            />
          </Drawer.Navigator>

        </NavigationContainer>

        <View style={mainStyles.footer}>
          <Text style={mainStyles.footerText}>Школьна Арина Леонідівна</Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}