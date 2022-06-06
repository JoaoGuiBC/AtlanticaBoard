import { Box, NativeBaseProvider, Text } from 'native-base';
import { StatusBar } from 'react-native';

import { theme } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Box flex={1} bg="gray.800" alignItems="center" justifyContent="center">
        <Text color="gray.50">Open up App.js to start working on your app!</Text>
      </Box>
    </NativeBaseProvider>
  );
}
