import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Page login */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="/*"
          element={
            user.isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
