import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, typography, spacing, borderRadius } from '../constants/theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = isDark ? darkTheme : lightTheme;
  
  return {
    colors,
    typography,
    spacing,
    borderRadius,
    isDark,
  };
};