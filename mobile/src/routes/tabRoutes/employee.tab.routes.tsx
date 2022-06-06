import React from 'react';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListEmployess } from '@screens/employees/ListEmployees';
import { CreateEmployee } from '@screens/employees/CreateEmployee';

const { Navigator, Screen } = createBottomTabNavigator();

export function EmployeeTabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.gray[100],
        tabBarInactiveTintColor: colors.gray[300],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 56,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: colors.gray[900],
        },
      }}
    >
      <Screen
        name="listEmployees"
        component={ListEmployess}
      />

      <Screen
        name="createEmployee"
        component={CreateEmployee}
      />

    </Navigator>
  );
}
