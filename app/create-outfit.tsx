import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ClothingItem, getItemsByCategory } from '../utils/storage';
import OutfitSlot from '../components/OutfitSlot';

export default function CreateOutfitScreen() {
  const { colors, typography, spacing } = useTheme();
  
  const [topItems, setTopItems] = useState<ClothingItem[]>([]);
  const [bottomItems, setBottomItems] = useState<ClothingItem[]>([]);
  const [shoeItems, setShoeItems] = useState<ClothingItem[]>([]);
  
  const [selectedTop, setSelectedTop] = useState<ClothingItem | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<ClothingItem | null>(null);
  const [selectedShoes, setSelectedShoes] = useState<ClothingItem | null>(null);
  
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoeIndex, setShoeIndex] = useState(0);
  
  const [lockedTop, setLockedTop] = useState(false);
  const [lockedBottom, setLockedBottom] = useState(false);
  const [lockedShoes, setLockedShoes] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const tops = await getItemsByCategory('Top');
    const bottoms = await getItemsByCategory('Bottom');
    const shoes = await getItemsByCategory('Shoes');
    
    setTopItems(tops);
    setBottomItems(bottoms);
    setShoeItems(shoes);
  };

  const generateOutfit = () => {
    if (!lockedTop && topItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * topItems.length);
      setSelectedTop(topItems[randomIndex]);
      setTopIndex(randomIndex);
    }
    
    if (!lockedBottom && bottomItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * bottomItems.length);
      setSelectedBottom(bottomItems[randomIndex]);
      setBottomIndex(randomIndex);
    }
    
    if (!lockedShoes && shoeItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * shoeItems.length);
      setSelectedShoes(shoeItems[randomIndex]);
      setShoeIndex(randomIndex);
    }

    // Show message if any category is empty
    const emptyCategories = [];
    if (topItems.length === 0) emptyCategories.push('Tops');
    if (bottomItems.length === 0) emptyCategories.push('Bottoms');
    if (shoeItems.length === 0) emptyCategories.push('Shoes');
    
    if (emptyCategories.length > 0) {
      Alert.alert('Add More Items', `Add more ${emptyCategories.join(', ')} to get a complete outfit!`);
    }
  };

  const handleSwipe = (category: 'Top' | 'Bottom' | 'Shoes', direction: 'left' | 'right') => {
    if (category === 'Top' && !lockedTop && topItems.length > 0) {
      const newIndex = direction === 'right' 
        ? (topIndex + 1) % topItems.length 
        : (topIndex - 1 + topItems.length) % topItems.length;
      setTopIndex(newIndex);
      setSelectedTop(topItems[newIndex]);
    } else if (category === 'Bottom' && !lockedBottom && bottomItems.length > 0) {
      const newIndex = direction === 'right' 
        ? (bottomIndex + 1) % bottomItems.length 
        : (bottomIndex - 1 + bottomItems.length) % bottomItems.length;
      setBottomIndex(newIndex);
      setSelectedBottom(bottomItems[newIndex]);
    } else if (category === 'Shoes' && !lockedShoes && shoeItems.length > 0) {
      const newIndex = direction === 'right' 
        ? (shoeIndex + 1) % shoeItems.length 
        : (shoeIndex - 1 + shoeItems.length) % shoeItems.length;
      setShoeIndex(newIndex);
      setSelectedShoes(shoeItems[newIndex]);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      padding: spacing.md,
    },
    title: {
      ...typography.h1,
      color: colors.textColorPrimary,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    outfitContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slotsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: spacing.xl,
    },
    generateButton: {
      backgroundColor: colors.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: 25,
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    buttonText: {
      ...typography.body,
      color: colors.backgroundColor,
      fontWeight: '600',
    },
    instructionText: {
      ...typography.caption,
      color: colors.textColorSecondary,
      textAlign: 'center',
      marginTop: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Outfit</Text>
      
      <View style={styles.outfitContainer}>
        <View style={styles.slotsContainer}>
          <OutfitSlot
            category="Top"
            item={selectedTop}
            isLocked={lockedTop}
            onToggleLock={() => setLockedTop(!lockedTop)}
            onSwipe={(direction) => handleSwipe('Top', direction)}
          />
          <OutfitSlot
            category="Bottom"
            item={selectedBottom}
            isLocked={lockedBottom}
            onToggleLock={() => setLockedBottom(!lockedBottom)}
            onSwipe={(direction) => handleSwipe('Bottom', direction)}
          />
          <OutfitSlot
            category="Shoes"
            item={selectedShoes}
            isLocked={lockedShoes}
            onToggleLock={() => setLockedShoes(!lockedShoes)}
            onSwipe={(direction) => handleSwipe('Shoes', direction)}
          />
        </View>
        
        <TouchableOpacity style={styles.generateButton} onPress={generateOutfit}>
          <Text style={styles.buttonText}>Generate Outfit</Text>
        </TouchableOpacity>
        
        <Text style={styles.instructionText}>
          Swipe left/right on items to change them. Tap the lock to keep an item fixed.
        </Text>
      </View>
    </View>
  );
}