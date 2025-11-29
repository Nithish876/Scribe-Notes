import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
  anchor: '(tabs)',
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Optional: Retry failed queries once
      staleTime: 5 * 60 * 1000, // 5 min cache for notes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log(colorScheme)
  return (
    <QueryClientProvider client={queryClient}>
    <PaperProvider 
    theme={colorScheme=== 'dark' ? MD3DarkTheme:MD3LightTheme}
    >
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </PaperProvider>
    </QueryClientProvider>
  );
}
