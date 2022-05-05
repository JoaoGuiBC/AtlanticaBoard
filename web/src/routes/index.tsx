import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Infographics } from '../pages/dashboard/infographics';
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
          <Route path="/dashboard" element={<Infographics />} />
        </Routes>
      </SidebarDrawerProvider>
    </BrowserRouter>
  );
}
