import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';

const AddMissionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: "",
  });
  const navigate = useNavigate();
  const { showError, showSuccess } = useContext(ErrorContext);
  const [users, setUsers] = useState([]);

  // 🔹 Récupérer les utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // si API protégée
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // si API protégée
      const res = await fetch("http://localhost:3000/missions/creating-mission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Lire le corps de la réponse pour obtenir le message d'erreur
        const errorData = await res.json(); // ou res.text() selon ton API
        throw new Error(errorData.message || "Erreur inconnue");
      }
        const data = await res.json();
        console.log("Mission créée :", data);
        setFormData({
          title: "",
          description: "",
          status: "pending",
          assignedTo: "",
      });
      showSuccess("Mission crée");
      navigate("/listMission");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-4 text-center">Ajouter une mission</h4>

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
                    required
                  />
                </div>

                {/* STATUS (readonly) */}
                <div className="mb-3">
                  <label className="form-label">Statut</label>
                  <select className="form-select" disabled>
                    <option value="pending">En attente</option>
                  </select>
                  <input type="hidden" name="status" value="pending" />
                </div>

                {/* ASSIGNED TO */}
                <div className="mb-4">
                  <label className="form-label">Assignée à</label>
                  <select
                    className="form-select"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Sélectionner un utilisateur --</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BOUTONS */}
                <div className="d-flex justify-content-end gap-2">
                  <button type="reset" className="btn btn-outline-secondary">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enregistrer
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

export default AddMissionForm;
