import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard';
import { SignIn } from '../pages/signIn';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

export function Router() {
  return (
    <BrowserRouter>
      <SidebarDrawerProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signIn" />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signIn/test" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Dashboard />} />
        </Routes>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
