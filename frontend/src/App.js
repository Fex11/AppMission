import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Test from './components/test';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profil" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
