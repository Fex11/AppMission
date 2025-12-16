import React, { useState } from 'react';

const AddMissionForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "pending",
        assignedTo: "",
      });
    
      // Exemple de users (à remplacer par ceux du backend)
      const users = [
        { _id: "1", username: "Alice" },
        { _id: "2", username: "Bob" },
      ];
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const payload = {
          ...formData,
          createdAt: new Date().toISOString(),
        };
    
        console.log("Mission à envoyer :", payload);
    
        // fetch("/api/missions", { method: "POST", body: JSON.stringify(payload) })
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
    
                    {/* STATUS */}
                    <div className="mb-3">
                        <label className="form-label">Statut</label>
                        <select className="form-select" disabled>
                            <option value="pending">En attente</option>
                        </select>

                        {/* valeur réellement envoyée */}
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