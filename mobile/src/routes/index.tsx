import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';

export function Routes() {
  return (
    <NavigationContainer>
      <EmployeeTabRoutes />
    </NavigationContainer>
  );
}
