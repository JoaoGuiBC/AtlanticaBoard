import { createStackNavigator } from '@react-navigation/stack';

import { Infographics } from '@screens/Infographics';

import { UpdateClient } from '@screens/clients/UpdateClient';
import { UpdateProduct } from '@screens/products/UpdateProduct';
import { UpdateBudget } from '@screens/budgets/UpdateBudget';
import { DetailedBudget } from '@screens/budgets/DetailedBudget';

import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';
import { ClientTabRoutes } from './tabRoutes/client.tab.routes';
import { ProductTabRoutes } from './tabRoutes/product.tab.routes';
import { BudgetTabRoutes } from './tabRoutes/budget.tab.routes';
import { OrderTabRoutes } from './tabRoutes/order.tab.routes';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="infographics"
    >
      <Screen name="infographics" component={Infographics} />

      <Screen name="employee" component={EmployeeTabRoutes} />

      <Screen name="client" component={ClientTabRoutes} />
      <Screen name="clientUpdate" component={UpdateClient} options={{ detachPreviousScreen: false }} />

      <Screen name="product" component={ProductTabRoutes} />
      <Screen name="productUpdate" component={UpdateProduct} options={{ detachPreviousScreen: false }} />

      <Screen name="budget" component={BudgetTabRoutes} />
      <Screen name="budgetUpdate" component={UpdateBudget} options={{ detachPreviousScreen: false }} />
      <Screen name="budgetDetail" component={DetailedBudget} options={{ detachPreviousScreen: false }} />

      <Screen name="order" component={OrderTabRoutes} />
    </Navigator>
  );
}
