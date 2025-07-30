import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function SettingsScreen() {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      padding: spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...typography.h1,
      color: colors.textColorPrimary,
      marginBottom: spacing.md,
    },
    subtitle: {
      ...typography.body,
      color: colors.textColorSecondary,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your MatchFit experience</Text>
    </View>
  );
}