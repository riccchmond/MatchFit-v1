import { MMKV } from 'react-native-mmkv';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

const storage = new MMKV();

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUri: string; // The local file URI
}

const ITEMS_KEY = 'clothing_items';

// Get all items from storage
export const getAllItems = (): ClothingItem[] => {
  const itemsString = storage.getString(ITEMS_KEY);
  if (itemsString) {
    return JSON.parse(itemsString) as ClothingItem[];
  }
  return [];
};

// Add a new item to storage
export const addItem = async (item: ClothingItem) => {
  const allItems = getAllItems();
  allItems.push(item);
  storage.set(ITEMS_KEY, JSON.stringify(allItems));
};

// Delete an item from storage and its image file
export const deleteItem = async (id: string) => {
  const allItems = getAllItems();
  const itemToDelete = allItems.find(item => item.id === id);
  if (itemToDelete) {
    // Delete the image file from local storage
    try {
      await FileSystem.deleteAsync(itemToDelete.imageUri, { idempotent: true });
    } catch (e) {
      console.error("Failed to delete image file:", e);
    }
    // Filter the item from the list and save
    const updatedItems = allItems.filter(item => item.id !== id);
    storage.set(ITEMS_KEY, JSON.stringify(updatedItems));
  }
};