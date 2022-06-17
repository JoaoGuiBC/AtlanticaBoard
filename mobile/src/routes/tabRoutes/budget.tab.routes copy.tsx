import React from 'react';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListBudgets } from '@screens/budgets/ListBudgets';
import { CreateBudget } from '@screens/budgets/CreateBudget';

import { BottomMenu } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function BudgetTabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.gray[50],
        tabBarInactiveTintColor: colors.gray[400],
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
        name="listBudgets"
        component={ListBudgets}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Listar" icon="list" />
          ),
        }}
      />

      <Screen
        name="createBudget"
        component={CreateBudget}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Criar" icon="user-plus" />
          ),
        }}
      />

    </Navigator>
  );
}
