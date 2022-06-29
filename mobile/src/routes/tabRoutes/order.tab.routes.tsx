import React from 'react';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ListOrders } from '@screens/orders/ListOrders';

import { BottomMenu } from '@components/BottomMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function OrderTabRoutes() {
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
        name="listOrders"
        component={ListOrders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Listar" icon="list" />
          ),
        }}
      />

      {/* <Screen
        name="createOrder"
        component={CreateOrder}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu color={color} title="Criar" icon="user-plus" />
          ),
        }}
      /> */}

    </Navigator>
  );
}
