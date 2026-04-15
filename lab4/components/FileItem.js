import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

const FileItem = ({ item, onPress, onLongPress, onInfo, onDelete }) => {
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity 
        style={styles.itemMain} 
        onPress={() => onPress(item)}
        onLongPress={() => onLongPress(item)}
      >
        <Ionicons 
          name={item.isDirectory ? "folder" : "document-text"} 
          size={30} 
          color={item.isDirectory ? COLORS.warning : COLORS.primary} 
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemSubText}>
            {item.isDirectory ? 'Папка' : 'Текстовий файл'}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionIcon} onPress={() => onInfo(item)}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon} onPress={() => onDelete(item)}>
          <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.white, 
    marginBottom: 1, 
    paddingHorizontal: SPACING.m, 
    alignItems: 'center' 
  },
  itemMain: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: SPACING.s + 2 
  },
  itemTextContainer: { 
    marginLeft: SPACING.m, 
    flex: 1 
  },
  itemText: { 
    fontSize: 16, 
    color: COLORS.darkText 
  },
  itemSubText: { 
    fontSize: 12, 
    color: COLORS.gray, 
    marginTop: 2 
  },
  itemActions: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  actionIcon: { 
    padding: SPACING.xs + 3, 
    marginLeft: SPACING.xs 
  },
});

export default FileItem;