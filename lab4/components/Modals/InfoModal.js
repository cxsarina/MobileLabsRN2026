import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

const InfoModal = ({ visible, item, onClose }) => {
  if (!item) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalSmallContent}>
          <Text style={styles.modalTitle}>Інформація</Text>
          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Назва:</Text>
              <Text style={styles.infoVal}>{item.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Тип:</Text>
              <Text style={styles.infoVal}>{item.isDirectory ? 'Папка' : 'Файл (.txt)'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Розмір:</Text>
              <Text style={styles.infoVal}>{item.size} байтів</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Змінено:</Text>
              <Text style={styles.infoVal}>
                {new Date(item.modificationTime * 1000).toLocaleString()}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Закрити" color={COLORS.primary} onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalSmallContent: { 
    backgroundColor: COLORS.white, 
    padding: SPACING.l, 
    borderRadius: 14, 
    width: '85%' 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: SPACING.m,
    color: COLORS.darkText,
    textAlign: 'center'
  },
  infoList: { 
    marginBottom: SPACING.l 
  },
  infoRow: {
    marginBottom: SPACING.s
  },
  infoLabel: { 
    fontWeight: 'bold', 
    color: COLORS.secondaryText, 
    marginBottom: 2 
  },
  infoVal: { 
    fontWeight: 'normal', 
    color: COLORS.darkText,
    fontSize: 15
  },
  buttonContainer: {
    marginTop: SPACING.s
  }
});

export default InfoModal;