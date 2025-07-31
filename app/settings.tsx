import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import BackupButton from '../components/BackupButton';
import RestoreButton from '../components/RestoreButton';

export default function SettingsScreen() {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      padding: spacing.md,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
      marginTop: spacing.lg,
    },
    title: {
      ...typography.h1,
      color: colors.textColorPrimary,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      color: colors.textColorSecondary,
      textAlign: 'center',
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.h2,
      color: colors.textColorPrimary,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      gap: spacing.md,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your wardrobe data</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.buttonContainer}>
          <BackupButton />
          <RestoreButton />
        </View>
      </View>
    </View>
  );
}