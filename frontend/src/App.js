import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page login */}
        <Route path="/login" element={<Login />} />

        {/* Toutes les autres routes passent par DashboardLayout */}
        <Route
          path="/*"
          element={<DashboardLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}
