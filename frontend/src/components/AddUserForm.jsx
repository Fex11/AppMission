import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AddUserForm = () => {
  // 1. Initialisation de l'état du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'agent', // Valeur par défaut pour le rôle
  });

  // 2. Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    
    // Logique pour traiter les données (par exemple, appel d'API)
    console.log('Données de l\'utilisateur à ajouter :', formData);

    // Réinitialisation du formulaire après soumission (optionnel)
    setFormData({
      name: '',
      email: '',
      role: 'agent',
    });

    // Vous pouvez ajouter une notification de succès ici
    alert(`Utilisateur ${formData.name} ajouté (voir console pour les données) !`);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Ajouter un Nouvel Utilisateur</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Champ : Nom */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Champ : Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            {/* Champ : Rôle (Select) */}
            <div className="mb-4">
              <label htmlFor="role" className="form-label">Rôle</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="agent">Agent</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            
            {/* Bouton de Soumission */}
            <button type="submit" className="btn btn-primary w-100">
              Ajouter l'utilisateur
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;