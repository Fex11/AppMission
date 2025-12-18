import React, { useContext, useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, byStatus: [], myMissions: 0 });
  const [loading, setLoading] = useState(true);

  // Palette de couleurs sobre (Gris bleuté et ardoise)
  const COLORS = ['#94a3b8', '#64748b', '#475569'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // RÉCUPÉRATION DU TOKEN (Indispensable pour passer le AuthGuard)
        const token = localStorage.getItem('token'); 
        let url="http://localhost:3000/missions/filtered?limit=100";
        if(localStorage.getItem("id") && localStorage.getItem("roles")=="agent") url=url+`&assignedTo=${localStorage.getItem("id")}`
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Accès refusé ou erreur serveur');

        const result = await response.json();
        
        // On extrait les missions du champ "data" renvoyé par ton service
        const missions = result.data || [];

        // 1. Calcul du total (via le champ total du back ou la longueur du tableau)
        const totalCount = result.total || missions.length;

        // 2. Répartition par statut pour le graphique
        const counts = missions.reduce((acc, m) => {
          acc[m.status] = (acc[m.status] || 0) + 1;
          return acc;
        }, {});

        const statusData = Object.keys(counts).map(key => ({
          name: key === 'pending' ? 'En attente' : key === 'in_progress' ? 'En cours' : 'Terminé',
          value: counts[key]
        }));

        // 3. Missions assignées à l'utilisateur connecté
        // On compare avec l'ID du contexte (en gérant id ou _id)
        const currentUserId = user?.id || user?._id;
        const myMissionsCount = missions.filter(m => {
          const assignedId = m.assignedTo?._id || m.assignedTo;
          return assignedId === currentUserId;
        }).length;

        setStats({ total: totalCount, byStatus: statusData, myMissions: myMissionsCount });
      } catch (error) {
        console.error("Erreur Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (loading) return <div className="text-center mt-5 text-secondary">Chargement du tableau de bord...</div>;

  return (
    <div className="container mt-4 mb-5">
      <h4 className="fw-light text-secondary mb-4 border-bottom pb-2">Vue d'ensemble</h4>

      {/* --- CARTES DE RÉSUMÉ --- */}
      <div className="row g-3 mb-4">
      {localStorage.getItem("roles") === "admin" && (
        <div className="col-md-6">
          <div className="card border-0 shadow-sm bg-light p-3">
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Total Missions en base</small>
            <h2 className="display-6 mb-0 text-dark opacity-75">{stats.total}</h2>
          </div>
        </div>
      )}
      {localStorage.getItem("roles") === "agent" && (
        <div className="col-md-6">
          <div className="card border-0 shadow-sm bg-light border-start border-secondary border-4 p-3">
            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Mes Missions</small>
            <h2 className="display-6 mb-0 text-secondary">{stats.myMissions}</h2>
          </div>
        </div>
      )}
      </div>

      {/* --- GRAPHIQUES --- */}
      <div className="row g-4">
        {/*<div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="text-secondary fw-bold mb-4">Missions par statut</h6>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={stats.byStatus} innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value">
                    {stats.byStatus.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>*/}

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h6 className="text-secondary fw-bold mb-4">Volume d'activité</h6>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={stats.byStatus}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}