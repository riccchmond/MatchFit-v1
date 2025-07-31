import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { ClothingItem, getAllItems } from '../utils/storage';

export default function WardrobeScreen() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();
  const [items, setItems] = useState<ClothingItem[]>([]);

  const loadItems = async () => {
    const allItems = await getAllItems();
    setItems(allItems);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemImageContainer}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
        ) : (
          <View style={[styles.itemImage, styles.placeholderImage]}>
            <Ionicons name="shirt-outline" size={32} color={colors.textColorSecondary} />
          </View>
        )}
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    header: {
      padding: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      ...typography.h1,
      color: colors.textColorPrimary,
    },
    addButton: {
      backgroundColor: colors.primaryColor,
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      padding: spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      ...typography.body,
      color: colors.textColorSecondary,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    emptyButton: {
      backgroundColor: colors.primaryColor,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyButtonText: {
      ...typography.body,
      color: colors.backgroundColor,
      fontWeight: '600',
      marginLeft: spacing.sm,
    },
    grid: {
      paddingBottom: spacing.lg,
    },
    itemCard: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 12,
      padding: spacing.md,
      margin: spacing.sm,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.textColorSecondary,
      width: '45%',
    },
    itemImageContainer: {
      marginBottom: spacing.sm,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    placeholderImage: {
      backgroundColor: colors.textColorSecondary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.textColorSecondary,
      borderStyle: 'dashed',
    },
    itemName: {
      ...typography.body,
      color: colors.textColorPrimary,
      fontWeight: '600',
      textAlign: 'center',
    },
    itemCategory: {
      ...typography.caption,
      color: colors.textColorSecondary,
      marginTop: spacing.xs,
    },
    bottomActions: {
      padding: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.textColorSecondary,
    },
    outfitButton: {
      backgroundColor: colors.primaryColor,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    outfitButtonText: {
      ...typography.body,
      color: colors.backgroundColor,
      fontWeight: '600',
      marginLeft: spacing.sm,
    },
  });

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Wardrobe</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-item')}
          >
            <Ionicons name="add" size={24} color={colors.backgroundColor} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Your wardrobe is empty!{'\n'}Tap '+' to add your first item.
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => router.push('/add-item')}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.backgroundColor} />
            <Text style={styles.emptyButtonText}>Add First Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wardrobe</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-item')}
        >
          <Ionicons name="add" size={24} color={colors.backgroundColor} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.outfitButton}
          onPress={() => router.push('/create-outfit')}
        >
          <Ionicons name="shirt-outline" size={24} color={colors.backgroundColor} />
          <Text style={styles.outfitButtonText}>Create Outfit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}