import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddMissionForm from "./AddMissionForm";
import AddUserForm from "./AddUserForm";
import EditMissionForm from "./EditMissionForm";
import Home from "./Home";
import Navbar from "./navbar";

export default function DashboardLayout() {
  const { user,loading } = useContext(AuthContext);


  if (loading) return <div>Chargement...</div>;

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<AddUserForm />} />
          <Route path="/createMission" element={<AddMissionForm />} />
          <Route path="/editMission" element={<EditMissionForm />} />
        </Routes>
      </div>
    </>
  );
}
