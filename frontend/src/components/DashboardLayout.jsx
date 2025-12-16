import { Route, Routes } from "react-router-dom";
import AddUserForm from "./AddUserForm";
import Home from "./home";
import Navbar from "./navbar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<AddUserForm />} />
        </Routes>
      </div>
    </>
  );
}
