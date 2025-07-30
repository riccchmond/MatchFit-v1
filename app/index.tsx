import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      padding: spacing.md,
      justifyContent: 'center',
    },
    title: {
      ...typography.h1,
      color: colors.textColorPrimary,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },
    subtitle: {
      ...typography.body,
      color: colors.textColorSecondary,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },
    button: {
      backgroundColor: colors.primaryColor,
      padding: spacing.md,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
      marginBottom: spacing.md,
    },
    buttonText: {
      ...typography.body,
      color: colors.backgroundColor,
      fontWeight: '600',
      marginLeft: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MatchFit</Text>
      <Text style={styles.subtitle}>Your personal wardrobe assistant</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/wardrobe')}
      >
        <Ionicons name="shirt-outline" size={24} color={colors.backgroundColor} />
        <Text style={styles.buttonText}>My Wardrobe</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="settings-outline" size={24} color={colors.backgroundColor} />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}