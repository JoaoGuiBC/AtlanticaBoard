import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SidebarDrawerProvider } from '@contexts/SidebarDrawerContext';
import { ProtectedRoute } from '@components/ProtectedRoute';

import { SignIn } from '@pages/signIn';

import { Infographics } from '@pages/dashboard/infographics';

import { ClientList } from '@pages/dashboard/clients';
import { CreateClient } from '@pages/dashboard/clients/create';

import { EmployeeList } from '@pages/dashboard/employees';
import { CreateEmployee } from '@pages/dashboard/employees/create';

import { ProductList } from '@pages/dashboard/products';
import { CreateProduct } from '@pages/dashboard/products/create';

export function Router() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signIn" />} />

          <Route path="/signIn" element={<SignIn />} />

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
        </Routes>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
