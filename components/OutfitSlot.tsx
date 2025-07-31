import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { ClothingItem } from '../utils/storage';

interface OutfitSlotProps {
  category: 'Top' | 'Bottom' | 'Shoes';
  item: ClothingItem | null;
  isLocked: boolean;
  onToggleLock: () => void;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function OutfitSlot({ category, item, isLocked, onToggleLock, onSwipe }: OutfitSlotProps) {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: spacing.md,
    },
    slotContainer: {
      position: 'relative',
    },
    slot: {
      width: 120,
      height: 120,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isLocked ? colors.primaryColor : colors.textColorSecondary,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: item ? 'solid' : 'dashed',
    },
    lockButton: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: colors.backgroundColor,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.textColorSecondary,
    },
    swipeButtons: {
      flexDirection: 'row',
      marginTop: spacing.sm,
      gap: spacing.sm,
    },
    swipeButton: {
      backgroundColor: colors.primaryColor,
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryLabel: {
      ...typography.body,
      color: colors.textColorPrimary,
      fontWeight: '600',
      marginTop: spacing.sm,
    },
    itemName: {
      ...typography.caption,
      color: colors.textColorSecondary,
      marginTop: spacing.xs,
    },
    emptyText: {
      ...typography.caption,
      color: colors.textColorSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.slotContainer}>
        <View style={styles.slot}>
          {item ? (
            <Text style={styles.emptyText}>{item.name}</Text>
          ) : (
            <Text style={styles.emptyText}>No {category}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.lockButton} onPress={onToggleLock}>
          <Ionicons 
            name={isLocked ? 'lock-closed' : 'lock-open'} 
            size={16} 
            color={isLocked ? colors.primaryColor : colors.textColorSecondary} 
          />
        </TouchableOpacity>
      </View>
      {!isLocked && item && (
        <View style={styles.swipeButtons}>
          <TouchableOpacity style={styles.swipeButton} onPress={() => onSwipe('left')}>
            <Ionicons name="chevron-back" size={16} color={colors.backgroundColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.swipeButton} onPress={() => onSwipe('right')}>
            <Ionicons name="chevron-forward" size={16} color={colors.backgroundColor} />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.categoryLabel}>{category}</Text>
      {item && <Text style={styles.itemName}>{item.name}</Text>}
    </View>
  );
}