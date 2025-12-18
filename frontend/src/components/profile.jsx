import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return navigate('/login');

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!res.ok) throw new Error();
        setProfile(await res.json());
      } catch (err) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [user, navigate]);

  if (!profile) return (
    <div className="d-flex justify-content-center mt-5 text-secondary italic">Chargement...</div>
  );

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          {/* Card avec bordures fines et fond gris très clair */}
          <div className="card shadow-sm border-0 bg-light bg-gradient">
            <div className="card-body p-4">
              
              {/* En-tête sobre */}
              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="bg-secondary bg-opacity-25 text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold" 
                     style={{ width: '50px', height: '50px' }}>
                  {profile.username[0].toUpperCase()}
                </div>
                <div className="ms-3">
                  <h5 className="mb-0 text-dark opacity-75">{profile.username}</h5>
                  <small className="text-muted">Membre actif</small>
                </div>
              </div>

              {/* Détails avec couleurs atténuées */}
              <div className="mb-3">
                <label className="text-secondary small fw-bold text-uppercase mb-1 d-block" style={{ letterSpacing: '0.5px' }}>Rôle</label>
                <div className="text-dark p-2 rounded bg-white border border-light shadow-sm" style={{ fontSize: '0.9rem' }}>
                  {profile.roles}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-secondary small fw-bold text-uppercase mb-1 d-block" style={{ letterSpacing: '0.5px' }}>Email</label>
                <div className="text-dark p-2 rounded bg-white border border-light shadow-sm" style={{ fontSize: '0.9rem' }}>
                  {profile.email}
                </div>
              </div>

              <button 
                onClick={() => navigate(-1)} 
                className="btn btn-sm btn-outline-secondary w-100 py-2"
                style={{ borderRadius: '8px' }}
              >
                Retourner au tableau de bord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}