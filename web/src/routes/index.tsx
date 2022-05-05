import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { SignIn } from '../pages/signIn';
import { Infographics } from '../pages/dashboard/infographics';
import { ClientList } from '../pages/dashboard/clients';
import { CreateClient } from '../pages/dashboard/clients/create';

export function Router() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signIn" />} />

          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signIn/test" element={<SignIn />} />

          <Route path="/dashboard" element={<Infographics />} />

          <Route path="/clientes" element={<ClientList />} />
          <Route path="/clientes/criar" element={<CreateClient />} />
        </Routes>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
