import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20 },
  footer: { padding: 10, backgroundColor: '#f8f8f8', borderTopWidth: 1, borderColor: '#eee' },
  footerText: { textAlign: 'center', fontSize: 12, color: '#666', fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});