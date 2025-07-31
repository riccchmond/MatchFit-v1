// MMKV-like storage implementation using localStorage for web/AsyncStorage simulation
// This simulates MMKV behavior for the app

export interface ClothingItem {
  id: string;
  name: string;
  category: 'Top' | 'Bottom' | 'Shoes' | 'Outerwear' | 'Accessory';
  imageUri?: string;
  color?: string;
}

class MMKVStorage {
  private storage: Map<string, string> = new Map();
  private ITEMS_KEY = 'wardrobe_items';

  constructor() {
    // Initialize with mock data
    const mockItems: ClothingItem[] = [
      { id: '1', name: 'White T-Shirt', category: 'Top', imageUri: 'file:///mock-tshirt.jpg' },
      { id: '2', name: 'Blue Jeans', category: 'Bottom', imageUri: 'file:///mock-jeans.jpg' },
      { id: '3', name: 'Sneakers', category: 'Shoes', imageUri: 'file:///mock-sneakers.jpg' },
      { id: '4', name: 'Black Sweater', category: 'Top', imageUri: 'file:///mock-sweater.jpg' },
      { id: '5', name: 'Khaki Pants', category: 'Bottom', imageUri: 'file:///mock-pants.jpg' },
      { id: '6', name: 'Boots', category: 'Shoes', imageUri: 'file:///mock-boots.jpg' },
    ];
  }

  set(key: string, value: string): void {
    this.storage.set(key, value);
  }

  getString(key: string): string | undefined {
    return this.storage.get(key);
  }

  delete(key: string): void {
    this.storage.delete(key);
  }

  getAllKeys(): string[] {
    return Array.from(this.storage.keys());
  }

  // Wardrobe-specific methods
  getItems(): ClothingItem[] {
    const itemsJson = this.getString(this.ITEMS_KEY);
    return itemsJson ? JSON.parse(itemsJson) : [];
  }

  setItems(items: ClothingItem[]): void {
    this.set(this.ITEMS_KEY, JSON.stringify(items));
  }

  addItem(item: Omit<ClothingItem, 'id'>): void {
    const items = this.getItems();
    const newItem: ClothingItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    items.push(newItem);
    this.setItems(items);
  }

  getItemsByCategory(category: string): ClothingItem[] {
    return this.getItems().filter(item => item.category === category);
  }

  // Export all data for backup
  exportAllData(): { [key: string]: string } {
    const data: { [key: string]: string } = {};
    for (const [key, value] of this.storage) {
      data[key] = value;
    }
    return data;
  }

  // Import data from backup
  importAllData(data: { [key: string]: string }): void {
    this.storage.clear();
    for (const [key, value] of Object.entries(data)) {
      this.storage.set(key, value);
    }
  }
}

export const mmkvStorage = new MMKVStorage();