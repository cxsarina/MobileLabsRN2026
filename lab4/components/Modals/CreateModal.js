import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const CreateModal = ({ visible, isFolder, value, onChangeText, onClose, onCreate }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalSmallContent}>
          <Text style={styles.modalTitle}>Створити {isFolder ? 'папку' : 'файл'}</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Назва" 
            value={value} 
            onChangeText={onChangeText} 
            autoFocus 
          />
          <View style={styles.modalButtons}>
            <Button title="Скасувати" color={COLORS.danger} onPress={onClose} />
            <Button title="ОК" onPress={onCreate} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalSmallContent: { backgroundColor: COLORS.white, padding: 20, borderRadius: 14, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderBottomWidth: 1, borderColor: COLORS.lightGray, marginBottom: 20, padding: 8 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default CreateModal;