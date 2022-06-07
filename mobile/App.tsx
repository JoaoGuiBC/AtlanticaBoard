import { useCallback, useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NativeBaseProvider } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { apolloClient } from '@lib/apollo';
import { AuthProvider } from '@hooks/auth';

import { theme } from './src/styles/theme';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NativeBaseProvider theme={theme}>
        <AuthProvider>
          <StatusBar barStyle="light-content" backgroundColor="#181B23" />
          <View onLayout={onLayoutRootView} />

          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
