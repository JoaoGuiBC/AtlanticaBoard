import { createStackNavigator } from '@react-navigation/stack';

import { UpdateClient } from '@screens/clients/UpdateClient';
import { UpdateProduct } from '@screens/products/UpdateProduct';
import { UpdateBudget } from '@screens/budgets/UpdateBudget';

import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';
import { ClientTabRoutes } from './tabRoutes/client.tab.routes';
import { ProductTabRoutes } from './tabRoutes/product.tab.routes';
import { BudgetTabRoutes } from './tabRoutes/budget.tab.routes copy';

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

      <Screen name="budget" component={BudgetTabRoutes} />
      <Screen name="budgetUpdate" component={UpdateBudget} options={{ detachPreviousScreen: false }} />
    </Navigator>
  );
}
