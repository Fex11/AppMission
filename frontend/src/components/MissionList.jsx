import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../context/ErrorContext";

const API_URL = "http://localhost:3000/missions";

export default function MissionsList() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const role =  localStorage.getItem("roles");

  const [statusFilter, setStatusFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  const { showError,showSuccess } = useContext(ErrorContext);

  

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/auth/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // Essaye de parser le corps JSON pour récupérer le message d'erreur
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      showError(err);
    }
  };

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const id =  localStorage.getItem("id");
      
      // Construire les params pour le backend
      const params = new URLSearchParams({
        page,
        limit: 3, // nombre d'éléments par page
        ...(statusFilter && { status: statusFilter }),
        ...(assignedFilter && { assignedTo: assignedFilter }),
      });

      if(role==="agent"){
        params.set("assignedTo", id);
      }

      const res = await fetch(`${API_URL}/filtered?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Essaye de parser le corps JSON pour récupérer le message d'erreur
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }

      const data = await res.json();
      setMissions(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Re-fetch quand filtre ou page change
  useEffect(() => {
    fetchMissions();
  }, [statusFilter, assignedFilter, page]);

  const handleDelete = async (_id) => {
    if (!window.confirm("Supprimer cette mission ?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // Essaye de parser le corps JSON pour récupérer le message d'erreur
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }
      showSuccess("Suppression effectué");
      fetchMissions();
    } catch (error) {
      showError(error)
    }
  };

  const handleStatus = async (_id,action) => {
    if(action=="debute")if (!window.confirm("Voulez vous debuter cette mission ?")) return;
    if(action=="terminate")if (!window.confirm("Voulez vous terminer cette mission ?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/status/${_id}?action=${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // Essaye de parser le corps JSON pour récupérer le message d'erreur
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur inconnue du serveur");
      }
  
      fetchMissions();
    } catch (error) {
      showError(error)
    }
  };

  if (loading) return <div className="container mt-4">Chargement...</div>;

  return (
    <div className="container">

      {/* SECTION FILTRES */}
      <div className="mb-3 p-2 rounded shadow-sm" style={{ maxWidth: "800px" }}>
        <h5 className="mb-3 fw-bold">Filtres des missions</h5>
        <div className="row g-3 align-items-end">
          {/* Filtre par statut */}
          <div className="col-md-3">
            <label htmlFor="statusFilter" className="form-label fw-semibold">
              Statut
            </label>
            <select
              id="statusFilter"
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminée</option>
            </select>
          </div>

          {/* Filtre par agent */}
          {role === "admin" && (
            <div className="col-md-3">
              <label htmlFor="assignedFilter" className="form-label fw-semibold">
                Assigné à
              </label>
              <select
                id="assignedFilter"
                className="form-select"
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
              >
                <option value="">Tous les agents</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          
        </div>
      </div>


      {/* HEADER */}
      <div
        className=" mb-3 p-3 bg-white rounded"
        style={{
          border: "1px solid #dee2e6", // bordure grise claire
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // ombre subtile
          width: "auto"     
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Liste des missions</h4>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/createMission")}
          >
            + Ajouter
          </button>
        </div>

        {/* TABLE RESPONSIVE */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigné à</th>
                <th>Créé le</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    Aucune mission
                  </td>
                </tr>
              )}
              {missions.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        m.status === "pending"
                          ? "bg-secondary"
                          : m.status === "in_progress"
                          ? "bg-warning text-dark"
                          : "bg-success"
                      }`}
                    >
                      {m.status.replace("_", " ")}
                    </span>
                  </td>
                  <td>{m.assignedTo?.username || m.assignedTo}</td>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                  <td className="text-end">
                    {m.status === "pending" && (
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => navigate(`/editMission/${m._id}`)}
                      >
                        Modifier
                      </button>
                    )}
                    {m.status === "pending" && (
                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => handleDelete(m._id)}
                      >
                        Supprimer
                      </button>
                    )}
                    {m.status === "pending" && (
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleStatus(m._id,"debute")}
                      >
                        Debuter
                      </button>
                    )}
                      {m.status === "in_progress" && (
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleStatus(m._id,"terminate")}
                      >
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Précédent
        </button>
        <span className="align-self-center">
          Page {page} / {totalPages}
        </span>
        <button
          className="btn btn-outline-primary ms-2"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
