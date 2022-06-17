import React from 'react';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListProducts } from '@screens/products/ListProducts';
import { CreateProduct } from '@screens/products/CreateProduct';

import { BottomMenu } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function ProductTabRoutes() {
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
        name="listProducts"
        component={ListProducts}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Listar" icon="list" />
          ),
        }}
      />

      <Screen
        name="createProduct"
        component={CreateProduct}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Criar" icon="user-plus" />
          ),
        }}
      />

    </Navigator>
  );
}
