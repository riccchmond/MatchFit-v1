// Simple in-memory storage for demo purposes
// In a real app, this would use react-native-mmkv

export interface ClothingItem {
  id: string;
  name: string;
  category: 'Top' | 'Bottom' | 'Shoes' | 'Outerwear' | 'Accessory';
  imageUri?: string;
  color?: string; // For demo purposes
}

// Mock data for demonstration
const mockItems: ClothingItem[] = [
  { id: '1', name: 'White T-Shirt', category: 'Top', color: '#FFFFFF' },
  { id: '2', name: 'Blue Jeans', category: 'Bottom', color: '#4A90E2' },
  { id: '3', name: 'Sneakers', category: 'Shoes', color: '#333333' },
  { id: '4', name: 'Black Sweater', category: 'Top', color: '#000000' },
  { id: '5', name: 'Khaki Pants', category: 'Bottom', color: '#8B7355' },
  { id: '6', name: 'Boots', category: 'Shoes', color: '#8B4513' },
];

let items: ClothingItem[] = [...mockItems];

export const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const addItem = async (item: Omit<ClothingItem, 'id'>): Promise<void> => {
  const newItem: ClothingItem = {
    ...item,
    id: generateUniqueId(),
  };
  items.push(newItem);
};

export const getAllItems = async (): Promise<ClothingItem[]> => {
  return [...items];
};

export const getItemsByCategory = async (category: string): Promise<ClothingItem[]> => {
  return items.filter(item => item.category === category);
};