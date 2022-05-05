import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { Router } from './routes';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
);
