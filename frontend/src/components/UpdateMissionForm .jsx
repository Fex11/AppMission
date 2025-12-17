import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContext } from '../context/ErrorContext';

const UpdateMissionForm = () => {
  const { id } = useParams(); // id de la mission
  const navigate = useNavigate();
  const { showError, showSuccess } = useContext(ErrorContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: "",
  });

  const [mission, setMission] = useState({});

  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  /* 🔹 Charger la mission existante */
  useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await fetch(`http://localhost:3000/missions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
            // Essaye de parser le corps JSON pour récupérer le message d'erreur
            const errorData = await res.json();
            throw new Error(errorData.message || "Erreur inconnue du serveur");
        }
        const data = await res.json();
        setMission(data)
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "pending",
          assignedTo: data.assignedTo?._id || data.assignedTo || "",
        });
      } catch (error) {
        showError(error)
      }
    };

    fetchMission();
  }, [id, token]);

  /* 🔹 Charger les users */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
            // Essaye de parser le corps JSON pour récupérer le message d'erreur
            const errorData = await res.json();
            throw new Error(errorData.message || "Erreur inconnue du serveur");
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        showError(error);
      }
    };

    fetchUsers();
  }, [token]);

  /* 🔹 Gestion des changements */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* 🔹 Soumission update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/missions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur update");
      }
    showSuccess("Modification reussi");
      navigate("/listMission");
    } catch (error) {
      showError(error)
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4 text-center">Modifier la mission</h4>

              <form onSubmit={handleSubmit}>

                {/* TITRE */}
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* STATUS */}
                <div className="mb-3">
                  <label className="form-label">Statut</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminée</option>
                  </select>
                </div>

                {/* ASSIGNED TO */}
                <div className="mb-4">
                  <label className="form-label">Assignée à</label>
                  <select
                    className="form-select"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  >
                    <option value="">-- Sélectionner un utilisateur --</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* INFOS LECTURE SEULE */}
                <div className="mb-3 text-muted">
                  <small>
                    Créée le : {new Date(mission.createdAt).toLocaleString()}
                  </small>
                </div>

                {/* BOUTONS */}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/listMission")}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Mettre à jour
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdateMissionForm;
