import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { addItem } from '../utils/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function AddItemScreen() {
  const { colors: themeColors, typography, spacing } = useTheme();
  const router = useRouter();
  
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Top');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    // Request for camera roll permissions
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable camera roll permissions to select a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await processImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request for camera permissions
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      Alert.alert('Permission required', 'Please enable camera permissions to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      await processImage(result.assets[0].uri);
    }
  };

  const processImage = async (uri: string) => {
    try {
      // Manipulate image for compression and resizing
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1500, height: 1500 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImageUri(manipResult.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to process image');
      setImageUri(null);
    }
  };

  const handleSave = async () => {
    if (!itemName.trim() || !selectedCategory || !imageUri) {
      Alert.alert('Error', 'Please enter a name, select a category, and add a photo.');
      return;
    }
    
    try {
      // Create a unique file name and move the compressed image from cache to a permanent location
      const newFileName = `${uuidv4()}.jpg`;
      const permanentUri = FileSystem.documentDirectory + newFileName;
      
      await FileSystem.moveAsync({
        from: imageUri,
        to: permanentUri,
      });

      const newItem = {
        id: uuidv4(),
        name: itemName.trim(),
        category: selectedCategory,
        imageUri: permanentUri,
      };
      
      await addItem(newItem);
      
      Alert.alert(
        'Item Added!', 
        `${itemName.trim()} has been added to your wardrobe.`,
        [
          { text: 'Add Another', onPress: () => {
            setItemName('');
            setSelectedCategory('Top');
            setImageUri(null);
          }},
          { text: 'Back to Wardrobe', onPress: () => router.back() }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save item. Please try again.');
      console.error(error);
    }
  };

  const categories = ['Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessory'];

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
    imageSection: {
      marginBottom: spacing.lg,
    },
    imagePreview: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      backgroundColor: themeColors.textColorSecondary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: themeColors.textColorSecondary,
      borderStyle: 'dashed',
    },
    imagePreviewWithImage: {
      borderStyle: 'solid',
    },
    addPhotoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.lg,
      padding: spacing.md,
    },
    addPhotoText: {
      ...typography.body,
      color: themeColors.textColorSecondary,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    addPhotoButton: {
      alignItems: 'center',
    },
    previewImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
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
      
      <ScrollView>
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
        
        <Text style={styles.label}>Photo</Text>
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={[
              styles.imagePreview,
              imageUri && styles.imagePreviewWithImage
            ]}
            onPress={imageUri ? undefined : () => {}} // Disable tapping on the image itself
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.addPhotoContainer}>
                <TouchableOpacity onPress={takePhoto} style={styles.addPhotoButton}>
                  <Ionicons name="camera-outline" size={48} color={themeColors.textColorSecondary} />
                  <Text style={styles.addPhotoText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} style={styles.addPhotoButton}>
                  <Ionicons name="image-outline" size={48} color={themeColors.textColorSecondary} />
                  <Text style={styles.addPhotoText}>From Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Item</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}