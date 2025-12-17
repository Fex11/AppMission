import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorContext } from '../context/ErrorContext';

const AddUserForm = () => {
  // 1. Initialisation de l'état du formulaire
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'agent', // Valeur par défaut pour le rôle (Agent ou Admin)
  });
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useContext(ErrorContext);
  
  // 2. Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = {
      ...formData,
      roles: [formData.role], // on crée un tableau
    };
    delete dataToSend.role; // on supprime l'ancien champ
    try {
      // Appel API vers votre backend NestJS
      const response = await fetch('http://localhost:3000/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si vous avez un token d'authentification, ajoutez-le ici
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création de l\'utilisateur');
      }

      // Succès
      showSuccess(`Utilisateur ${formData.username} créé avec succès !`);
      
      // Réinitialisation du formulaire après soumission
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'Agent',
      });

      navigate("/users")

    } catch (err) {
      showError(err.message || 'Une erreur est survenue lors de la création de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-black text-white">
            <h3 className="mb-0">Ajouter un Nouvel Utilisateur</h3>
          </div>
          <div className="card-body">
            <div>
              {/* Champ : Nom d'utilisateur */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Nom d'utilisateur <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  placeholder="Entrez le nom d'utilisateur"
                />
              </div>
              
              {/* Champ : Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  placeholder="exemple@email.com"
                />
              </div>
              
              {/* Champ : Mot de passe */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mot de passe <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-outline-secondary"
                    disabled={loading}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <small className="form-text text-muted">
                  Le mot de passe doit contenir au moins 6 caractères.
                </small>
              </div>
              
              {/* Champ : Rôle (Select) */}
              <div className="mb-4">
                <label htmlFor="role" className="form-label">
                  Rôle <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="agent">Agent</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              
              {/* Bouton de Soumission */}
              <button 
                type="button" 
                onClick={handleSubmit}
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Création en cours...
                  </>
                ) : (
                  'Ajouter l\'utilisateur'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;