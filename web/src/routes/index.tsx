import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SidebarDrawerProvider } from '@contexts/SidebarDrawerContext';
import { ProtectedRoute } from '@components/ProtectedRoute';

import { SignIn } from '@pages/signIn';
import { SignOrder } from '@pages/signOrder';

import { Infographics } from '@pages/dashboard/general/infographics';

import { ClientList } from '@pages/dashboard/registrationQuery/clients';
import { CreateClient } from '@pages/dashboard/registrationQuery/clients/create';

import { EmployeeList } from '@pages/dashboard/registrationQuery/employees';
import { CreateEmployee } from '@pages/dashboard/registrationQuery/employees/create';

import { ProductList } from '@pages/dashboard/registrationQuery/products';
import { CreateProduct } from '@pages/dashboard/registrationQuery/products/create';

import { BudgetList } from '@pages/dashboard/functional/budgets';
import { CreateBudget } from '@pages/dashboard/functional/budgets/create';
import { BudgetDetail } from '@pages/dashboard/functional/budgets/budgetDetail';
import { BudgetPDF } from '@pages/dashboard/functional/budgets/budgetPDF';

import { OrderList } from '@pages/dashboard/functional/orders';
import { OrderDetail } from '@pages/dashboard/functional/orders/orderDetail';
import { OrderPDF } from '@pages/dashboard/functional/orders/orderPDF';

export function Router() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signIn" />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/assinarPedido" element={<SignOrder />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                component={<Infographics />}
                redirectTo="/signIn"
              />
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute component={<ClientList />} redirectTo="/signIn" />
            }
          />
          <Route
            path="/clientes/criar"
            element={
              <ProtectedRoute
                component={<CreateClient />}
                redirectTo="/signIn"
              />
            }
          />

          <Route
            path="/funcionarios"
            element={
              <ProtectedRoute
                component={<EmployeeList />}
                redirectTo="/signIn"
              />
            }
          />
          <Route
            path="/funcionarios/criar"
            element={
              <ProtectedRoute
                component={<CreateEmployee />}
                redirectTo="/signIn"
              />
            }
          />

          <Route
            path="/produtos"
            element={
              <ProtectedRoute
                component={<ProductList />}
                redirectTo="/signIn"
              />
            }
          />
          <Route
            path="/produtos/criar"
            element={
              <ProtectedRoute
                component={<CreateProduct />}
                redirectTo="/signIn"
              />
            }
          />

          <Route
            path="/orcamentos"
            element={
              <ProtectedRoute component={<BudgetList />} redirectTo="/signIn" />
            }
          />
          <Route
            path="/orcamentos/pdf"
            element={
              <ProtectedRoute component={<BudgetPDF />} redirectTo="/signIn" />
            }
          />
          <Route
            path="/orcamentos/criar"
            element={
              <ProtectedRoute
                component={<CreateBudget />}
                redirectTo="/signIn"
              />
            }
          />
          <Route
            path="/orcamentos/orcamento"
            element={
              <ProtectedRoute
                component={<BudgetDetail />}
                redirectTo="/signIn"
              />
            }
          />

          <Route
            path="/pedidos"
            element={
              <ProtectedRoute component={<OrderList />} redirectTo="/signIn" />
            }
          />
          <Route
            path="/pedidos/pdf"
            element={
              <ProtectedRoute component={<OrderPDF />} redirectTo="/signIn" />
            }
          />
          <Route
            path="/pedidos/pedido"
            element={
              <ProtectedRoute
                component={<OrderDetail />}
                redirectTo="/signIn"
              />
            }
          />
        </Routes>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
