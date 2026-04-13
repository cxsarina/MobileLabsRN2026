import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginVertical: 15, textAlign: 'center' },
  footer: { 
    padding: 15, 
    backgroundColor: '#f8f8f8', 
    borderTopWidth: 1, 
    borderColor: '#eee', 
    alignItems: 'center' 
  },
  footerText: { fontSize: 12, color: '#666', fontWeight: '500' },
  // Стилі для карток новин
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 5 }
});

