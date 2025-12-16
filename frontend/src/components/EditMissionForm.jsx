import { useEffect, useState } from "react";

export default function EditMissionForm() {

  // ⚠️ simulé (normalement via API ou useParams)
  const missionFromApi = {
    _id: "123",
    title: "Installer le serveur",
    description: "Mise en place du serveur de production",
    status: "pending",
    assignedTo: "2",
    createdAt: "2025-03-20T10:00:00Z",
  };

  const users = [
    { _id: "1", username: "Alice" },
    { _id: "2", username: "Bob" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    assignedTo: "",
  });

  // 🔄 Charger les valeurs par défaut
  useEffect(() => {
    setFormData({
      title: missionFromApi.title,
      description: missionFromApi.description,
      status: missionFromApi.status,
      assignedTo: missionFromApi.assignedTo,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      _id: missionFromApi._id,
    };

    console.log("Mission modifiée :", payload);

    // fetch(`/api/missions/${payload._id}`, { method: "PUT", body: JSON.stringify(payload) })
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
                    required
                  />
                </div>

               {/* STATUS */}
               <div className="mb-3">
                    <label className="form-label">Statut</label>
                    <select className="form-select" disabled>
                        <option value="pending">En attente</option>
                    </select>

                    {/* valeur réellement envoyée */}
                    <input type="hidden" name="status" value="pending" />
                </div>

                {/* ASSIGNÉ À */}
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

                {/* INFOS LECTURE SEULE */}
                <div className="mb-3 text-muted">
                  <small>
                    Créée le : {new Date(missionFromApi.createdAt).toLocaleString()}
                  </small>
                </div>

                {/* ACTIONS */}
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-outline-secondary">
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Enregistrer les modifications
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
