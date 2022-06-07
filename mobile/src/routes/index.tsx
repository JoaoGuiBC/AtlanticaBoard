import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UseAuth } from '@hooks/auth';

import { SignIn } from '@screens/SignIn';

import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';

export function Routes() {
  const { user } = UseAuth();

  return (
    <NavigationContainer>
      {user ? (
        <EmployeeTabRoutes />
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}
