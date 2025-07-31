import { Stack } from "expo-router";
import { useTheme } from '../hooks/useTheme';

export default function RootLayout() {
  const { colors } = useTheme();
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerTintColor: colors.backgroundColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "MatchFit",
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="wardrobe" 
        options={{ title: "My Wardrobe" }} 
      />
      <Stack.Screen 
        name="add-item" 
        options={{ title: "Add Item" }} 
      />
      <Stack.Screen 
        name="create-outfit" 
        options={{ title: "Create Outfit" }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ title: "Settings" }} 
      />
    </Stack>
  );
}