import '../global.css';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { FONT_FAMILY } from '@/constants/fonts';
import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

const navigationFonts = {
  regular: { fontFamily: FONT_FAMILY, fontWeight: '400' as const },
  medium: { fontFamily: FONT_FAMILY, fontWeight: '500' as const },
  bold: { fontFamily: FONT_FAMILY, fontWeight: '700' as const },
  heavy: { fontFamily: FONT_FAMILY, fontWeight: '800' as const },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

/** Frame around the root stack + status bar (RN: `backgroundColor` + `padding`). */
const APP_SHELL_BACKGROUND = '#03418c';
const APP_SHELL_PADDING = 4;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    [FONT_FAMILY]: require('@/assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const navigationTheme =
    colorScheme === 'dark'
      ? { ...DarkTheme, fonts: navigationFonts }
      : { ...DefaultTheme, fonts: navigationFonts };

  return (
    <ThemeProvider value={navigationTheme}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: APP_SHELL_PADDING,
          backgroundColor: APP_SHELL_BACKGROUND,
        }}
      >
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}
