import { createStackNavigator } from '@react-navigation/stack';

import { UpdateClient } from '@screens/clients/UpdateClient';

import { EmployeeTabRoutes } from './tabRoutes/employee.tab.routes';
import { ClientTabRoutes } from './tabRoutes/client.tab.routes';

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
    </Navigator>
  );
}
