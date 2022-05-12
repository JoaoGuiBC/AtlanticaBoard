import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';

import { Router } from './routes';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import { apolloClient } from './lib/apollo';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
