import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  Alert, SafeAreaView, Platform 
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';

// Компоненти та константи
import { COLORS, SPACING } from '../constants/theme';
import FileItem from '../components/FileItem';
import InfoModal from '../components/Modals/InfoModal';
import CreateModal from '../components/Modals/CreateModal';
import EditModal from '../components/Modals/EditModal';

const FileManagerScreen = ({ onBack }) => {
  const [currentPath, setCurrentPath] = useState(FileSystem.documentDirectory || '');
  const [files, setFiles] = useState([]);
  
  // Стани для модалок
  const [modalState, setModalState] = useState({ create: false, edit: false, info: false });
  const [isFolder, setIsFolder] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [editingFileUri, setEditingFileUri] = useState('');
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);

  useEffect(() => {
    if (currentPath) loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path) => {
    try {
      const folderContent = await FileSystem.readDirectoryAsync(path);
      const fileDetails = await Promise.all(
        folderContent.map(async (name) => {
          const fileUri = path.endsWith('/') ? `${path}${name}` : `${path}/${name}`;
          const info = await FileSystem.getInfoAsync(fileUri);
          return { name, isDirectory: info.isDirectory, uri: info.uri, 
                   modificationTime: info.modificationTime, size: info.size };
        })
      );
      setFiles(fileDetails);
    } catch (error) { console.error(error); }
  };

  const goUp = () => {
    if (currentPath === FileSystem.documentDirectory) return onBack();
    let path = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    const parts = path.split('/');
    parts.pop();
    const newPath = parts.join('/') + '/';
    setCurrentPath(newPath.length < FileSystem.documentDirectory.length ? FileSystem.documentDirectory : newPath);
  };

  const handleCreate = async () => {
    if (!newItemName.trim()) return;
    const baseUri = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    try {
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(baseUri + newItemName.trim(), { intermediates: true });
      } else {
        const name = newItemName.trim().endsWith('.txt') ? newItemName.trim() : `${newItemName.trim()}.txt`;
        await FileSystem.writeAsStringAsync(baseUri + name, "Новий файл");
      }
      setNewItemName('');
      setModalState({ ...modalState, create: false });
      loadDirectory(currentPath);
    } catch (e) { Alert.alert("Помилка", "Не вдалося створити"); }
  };

  const openFile = async (item) => {
    try {
      const content = await FileSystem.readAsStringAsync(item.uri);
      setFileContent(content);
      setEditingFileUri(item.uri);
      setModalState({ ...modalState, edit: true });
    } catch (e) { Alert.alert("Помилка", "Не вдалося відкрити"); }
  };

  const saveChanges = async () => {
    try {
      await FileSystem.writeAsStringAsync(editingFileUri, fileContent);
      setModalState({ ...modalState, edit: false });
      loadDirectory(currentPath);
    } catch (e) { Alert.alert("Помилка", "Не вдалося зберегти"); }
  };

  const confirmDelete = (item) => {
    Alert.alert("Видалення", `Видалити ${item.name}?`, [
      { text: "Ні" },
      { text: "Так", style: "destructive", onPress: async () => {
          await FileSystem.deleteAsync(item.uri);
          loadDirectory(currentPath);
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goUp} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Менеджер</Text>
      </View>

      {/* Path Bar */}
      <View style={styles.pathBar}>
        <Text style={styles.pathText}>
          📍 {currentPath ? currentPath.replace(FileSystem.documentDirectory, './') : './'}
        </Text>
      </View>
      
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <FileItem 
            item={item} 
            onPress={(i) => i.isDirectory ? setCurrentPath(i.uri.endsWith('/') ? i.uri : `${i.uri}/`) : openFile(i)}
            onLongPress={confirmDelete}
            onInfo={(i) => { setSelectedFileInfo(i); setModalState({ ...modalState, info: true }); }}
            onDelete={confirmDelete}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Папка порожня</Text>}
      />

      {/* Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fab, { backgroundColor: COLORS.success }]} 
          onPress={() => { setIsFolder(true); setModalState({ ...modalState, create: true }); }}>
          <Ionicons name="folder-open-outline" size={22} color={COLORS.white} />
          <Text style={styles.fabText}>Папка</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, { backgroundColor: COLORS.primary }]} 
          onPress={() => { setIsFolder(false); setModalState({ ...modalState, create: true }); }}>
          <Ionicons name="document-text-outline" size={22} color={COLORS.white} />
          <Text style={styles.fabText}>Файл</Text>
        </TouchableOpacity>
      </View>

      {/* Modals Section */}
      <CreateModal 
        visible={modalState.create} isFolder={isFolder} value={newItemName} 
        onChangeText={setNewItemName} onCreate={handleCreate} 
        onClose={() => setModalState({ ...modalState, create: false })} 
      />
      <InfoModal 
        visible={modalState.info} item={selectedFileInfo} 
        onClose={() => setModalState({ ...modalState, info: false })} 
      />
      <EditModal 
        visible={modalState.edit} content={fileContent} 
        onContentChange={setFileContent} onSave={saveChanges}
        onClose={() => setModalState({ ...modalState, edit: false })} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: SPACING.m, backgroundColor: COLORS.white, borderBottomWidth: 1, borderColor: COLORS.lightGray },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: COLORS.primary, fontSize: 17, marginLeft: -5 },
  headerTitle: { fontSize: 17, fontWeight: '600', marginLeft: SPACING.l },
  pathBar: { padding: SPACING.s, backgroundColor: COLORS.lightGray + '50' },
  pathText: { fontSize: 12, color: COLORS.secondaryText, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  empty: { textAlign: 'center', marginTop: 50, color: COLORS.gray },
  fabContainer: { position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 15 },
  fab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, elevation: 4 },
  fabText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 5 },
});

export default FileManagerScreen;