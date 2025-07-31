export const lightTheme = {
  primaryColor: '#6200EE',
  accentColor: '#03DAC6',
  backgroundColor: '#FFFFFF',
  surfaceColor: '#F5F5F5',
  textColorPrimary: '#212121',
  textColorSecondary: '#757575',
  errorColor: '#B00020',
};

export const darkTheme = {
  primaryColor: '#BB86FC',
  accentColor: '#03DAC6',
  backgroundColor: '#121212',
  surfaceColor: '#1E1E1E',
  textColorPrimary: '#E0E0E0',
  textColorSecondary: '#B0B0B0',
  errorColor: '#CF6679',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
};