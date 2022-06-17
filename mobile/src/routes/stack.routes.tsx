import { createStackNavigator } from '@react-navigation/stack';

import { UpdateClient } from '@screens/clients/UpdateClient';
import { UpdateProduct } from '@screens/products/UpdateProduct';

import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';
import { ClientTabRoutes } from './tabRoutes/client.tab.routes';
import { ProductTabRoutes } from './tabRoutes/product.tab.routes';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="employees"
    >
      <Screen name="employee" component={EmployeeTabRoutes} />

      <Screen name="client" component={ClientTabRoutes} />
      <Screen name="clientUpdate" component={UpdateClient} options={{ detachPreviousScreen: false }} />

      <Screen name="product" component={ProductTabRoutes} />
      <Screen name="productUpdate" component={UpdateProduct} options={{ detachPreviousScreen: false }} />
    </Navigator>
  );
}
