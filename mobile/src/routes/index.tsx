import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UseAuth } from '@hooks/auth';

import { SignIn } from '@screens/SignIn';

import { ClientTabRoutes } from './tabRoutes/client.tab.routes';
// import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';

export function Routes() {
  const { user } = UseAuth();

  return (
    <NavigationContainer>
      {user ? (
        <ClientTabRoutes />
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
