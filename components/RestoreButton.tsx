import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { importWardrobe } from '../utils/backup-restore';
import { useRouter } from 'expo-router';

interface RestoreButtonProps {
  onPress?: () => void;
}

export default function RestoreButton({ onPress }: RestoreButtonProps) {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const handleImport = async () => {
    try {
      const sampleBackup = JSON.stringify({
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        data: {
          wardrobe_items: JSON.stringify([
            { id: 'demo1', name: 'Demo Shirt', category: 'Top', color: '#FF0000' },
            { id: 'demo2', name: 'Demo Pants', category: 'Bottom', color: '#0000FF' },
          ])
        },
        images: [],
      });

      const success = await importWardrobe(sampleBackup);
      if (success) {
        router.push('/wardrobe');
      }
    } catch (error) {
      Alert.alert('Import Failed', 'Unable to import wardrobe data.');
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.secondaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: 8,
      marginVertical: spacing.sm,
      minWidth: 200,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.primaryColor,
    },
    buttonText: {
      ...typography.button,
      color: colors.primaryColor,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handleImport}>
      <Text style={styles.buttonText}>Import Wardrobe</Text>
    </TouchableOpacity>
  );
}
