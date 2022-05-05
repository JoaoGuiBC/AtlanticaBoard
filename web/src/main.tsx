import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { Router } from './routes';
import { theme } from './styles/theme';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
);
