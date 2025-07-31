// Backup and restore utilities for wardrobe data
import { mmkvStorage } from './mmkv-storage';
import { Alert } from 'react-native';

export interface BackupData {
  timestamp: string;
  version: string;
  data: { [key: string]: string };
  images: string[]; // Array of image URIs
}

export const exportWardrobe = async (): Promise<string | null> => {
  try {
    // Get all MMKV data
    const allData = mmkvStorage.exportAllData();
    
    // Get all image URIs from clothing items
    const items = mmkvStorage.getItems();
    const imageUris = items
      .map(item => item.imageUri)
      .filter(uri => uri && uri.startsWith('file://')) as string[];

    // Create backup data structure
    const backupData: BackupData = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: allData,
      images: imageUris,
    };

    // Convert to JSON string
    const backupJson = JSON.stringify(backupData, null, 2);
    
    // In a real implementation, this would create a ZIP file
    // For now, we'll return the JSON string
    return backupJson;
  } catch (error) {
    console.error('Export failed:', error);
    Alert.alert('Export Failed', 'Unable to export wardrobe data.');
    return null;
  }
};

export const importWardrobe = async (backupJson: string): Promise<boolean> => {
  try {
    // Parse backup data
    const backupData: BackupData = JSON.parse(backupJson);
    
    // Validate backup data structure
    if (!backupData.data || !backupData.timestamp) {
      throw new Error('Invalid backup file format');
    }

    // Show confirmation dialog
    return new Promise((resolve) => {
      Alert.alert(
        'Import Wardrobe',
        'This will replace your current wardrobe data. Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Import',
            style: 'destructive',
            onPress: () => {
              try {
                // Import MMKV data
                mmkvStorage.importAllData(backupData.data);
                
                // In a real implementation, we would also restore image files
                // For now, we'll just import the data
                
                Alert.alert('Success', 'Wardrobe imported successfully!');
                resolve(true);
              } catch (error) {
                console.error('Import failed:', error);
                Alert.alert('Import Failed', 'Unable to import wardrobe data.');
                resolve(false);
              }
            },
          },
        ]
      );
    });
  } catch (error) {
    console.error('Import failed:', error);
    Alert.alert('Import Failed', 'Invalid backup file format.');
    return false;
  }
};