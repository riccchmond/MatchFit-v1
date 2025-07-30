import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { addItem } from '../utils/storage';

const categories = ['Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessory'];
const colors = ['#FFFFFF', '#000000', '#4A90E2', '#8B7355', '#8B4513', '#FF6B6B', '#4ECDC4', '#45B7D1'];

export default function AddItemScreen() {
  const { colors: themeColors, typography, spacing } = useTheme();
  const router = useRouter();
  
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSave = async () => {
    if (!itemName.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    try {
      await addItem({
        name: itemName.trim(),
        category: selectedCategory as any,
        color: selectedColor,
      });
      
      Alert.alert(
        'Item Added!', 
        `${itemName} has been added to your wardrobe.`,
        [
          { text: 'Add Another', onPress: () => setItemName('') },
          { text: 'Back to Wardrobe', onPress: () => router.back() }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
      padding: spacing.md,
    },
    title: {
      ...typography.h1,
      color: themeColors.textColorPrimary,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    input: {
      borderWidth: 1,
      borderColor: themeColors.textColorSecondary,
      borderRadius: 8,
      padding: spacing.md,
      marginBottom: spacing.md,
      ...typography.body,
      color: themeColors.textColorPrimary,
    },
    label: {
      ...typography.body,
      color: themeColors.textColorPrimary,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    categoryButton: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeColors.textColorSecondary,
    },
    categoryButtonSelected: {
      backgroundColor: themeColors.primaryColor,
      borderColor: themeColors.primaryColor,
    },
    categoryText: {
      ...typography.caption,
      color: themeColors.textColorSecondary,
    },
    categoryTextSelected: {
      color: themeColors.backgroundColor,
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    colorButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    colorButtonSelected: {
      borderColor: themeColors.primaryColor,
    },
    saveButton: {
      backgroundColor: themeColors.primaryColor,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      ...typography.body,
      color: themeColors.backgroundColor,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Item</Text>
      
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name..."
        placeholderTextColor={themeColors.textColorSecondary}
      />
      
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextSelected
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.label}>Color</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.colorButtonSelected
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Item</Text>
      </TouchableOpacity>
    </View>
  );
}