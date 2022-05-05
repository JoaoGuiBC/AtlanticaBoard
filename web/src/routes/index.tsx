import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard } from '../pages/dashboard';
import { SignIn } from '../pages/signIn';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
