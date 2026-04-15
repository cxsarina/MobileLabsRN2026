import React from 'react';
import { Modal, SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const EditModal = ({ visible, content, onContentChange, onClose, onSave }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, padding: 20 }}>
              <View style={styles.editorHeader}>
                <Text style={styles.modalTitle}>Редактор</Text>
                <TouchableOpacity onPress={() => { Keyboard.dismiss(); onClose(); }}>
                  <Ionicons name="close" size={30} color={COLORS.darkText} />
                </TouchableOpacity>
              </View>
              <TextInput 
                style={styles.editorInput} 
                multiline 
                value={content} 
                onChangeText={onContentChange} 
              />
              <TouchableOpacity style={styles.saveBtn} onPress={() => { Keyboard.dismiss(); onSave(); }}>
                <Text style={styles.saveBtnText}>Зберегти файл</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  editorInput: { flex: 1, backgroundColor: COLORS.background, padding: 15, borderRadius: 10, textAlignVertical: 'top', fontSize: 16 },
  saveBtn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10, marginTop: 15, alignItems: 'center' },
  saveBtnText: { color: COLORS.white, fontWeight: 'bold' },
});

export default EditModal;