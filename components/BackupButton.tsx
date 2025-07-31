import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { exportWardrobe } from '../utils/backup-restore';

interface BackupButtonProps {
  onPress?: () => void;
}

export default function BackupButton({ onPress }: BackupButtonProps) {
  const { colors, typography, spacing } = useTheme();

  const handleExport = async () => {
    try {
      const backupData = await exportWardrobe();
      if (backupData) {
        // In a real implementation, this would save to file system
        // For demo, we'll just show success message
        Alert.alert(
          'Export Successful',
          'Wardrobe data has been exported successfully!',
          [{ text: 'OK', onPress }]
        );
      }
    } catch (error) {
      Alert.alert('Export Failed', 'Unable to export wardrobe data.');
    }
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: 8,
      marginVertical: spacing.sm,
      minWidth: 200,
      alignItems: 'center',
    },
    buttonText: {
      ...typography.button,
      color: colors.backgroundColor,
      fontWeight: '600',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={handleExport}>
      <Text style={styles.buttonText}>Export Wardrobe</Text>
    </TouchableOpacity>
  );
}