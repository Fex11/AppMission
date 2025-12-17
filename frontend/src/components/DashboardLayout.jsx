import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ErrorContext } from "../context/ErrorContext";
import AddMissionForm from "./AddMissionForm";
import AddUserForm from "./AddUserForm";
import Home from "./home";
import MissionsList from "./MissionList";
import UpdateMissionForm from "./UpdateMissionForm ";
import Navbar from "./navbar";
import UsersList from "./UsersList";

export default function DashboardLayout() {
  const { user,loading } = useContext(AuthContext);
  const { error, clearError, success, clearSuccess } = useContext(ErrorContext);


  if (loading) return <div>Chargement...</div>;

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />

      {error && (
        <div className="container mt-4">
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error?.message || error}
            <button
              type="button"
              className="btn-close btn-close-black"
              aria-label="Close"
              onClick={clearError}
            />
          </div>
        </div>
      )}
      
      {success && (
        <div className="container mt-4">
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success?.message || success}
            <button
              type="button"
              className="btn-close btn-close-black"
              aria-label="Close"
              onClick={clearSuccess}
            />
          </div>
        </div>
      )}

      <div className="container mt-4">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<AddUserForm />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/listMission" element={<MissionsList />} />
          <Route path="/createMission" element={<AddMissionForm />} />
          <Route path="/updateMission/:id" element={<UpdateMissionForm />} />
        </Routes>
      </div>
    </>
  );
}
