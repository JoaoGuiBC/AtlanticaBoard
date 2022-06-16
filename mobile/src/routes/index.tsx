import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UseAuth } from '@hooks/auth';

import { SignIn } from '@screens/SignIn';

import { StackRoutes } from './stack.routes';

export function Routes() {
  const { user } = UseAuth();

  return (
    <NavigationContainer>
      {user ? (
        <StackRoutes />
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
