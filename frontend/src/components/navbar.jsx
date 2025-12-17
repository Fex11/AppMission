import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import socket from "../utils/socket";


export default function Navbar() {
    const navigate = useNavigate();
    const { logout,user } = useContext(AuthContext);
    const [notifCount, setNotifCount] = useState(0);


    const deco = () =>{
        logout();
        navigate("/login");
    }

    useEffect(() => {
      const handleNewMission = (mission) => {
        console.log("Mission créée :", mission);
        setNotifCount((prev) => prev + 1);
      };
    
      socket.on("new-mission", handleNewMission);
    
      return () => {
        socket.off("new-mission", handleNewMission);
      };
    }, []);
    

  return (
    <>
      {/* NAVBAR CUSTOM */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          {/* Brand */}
          <Link className="navbar-brand" to="/">
           MonApp
        </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">

            {/* MENU GAUCHE */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/createUser"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Créer-users
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Liste-users
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/listMission"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Missions
                    </NavLink>
                </li>
            </ul>

            {/* MENU DROITE */}
            <ul className="navbar-nav ms-auto">
              {/* Notification */}
              {localStorage.getItem("roles")==="agent" && (
              <li className="nav-item me-3 position-relative">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/listMission");
                    setNotifCount(0); // reset quand on clique
                  }}
                >
                  <i className="bi bi-bell" style={{ fontSize: "20px" }}></i>

                  {notifCount > 0 && (
                    <span
                      className="badge rounded-pill bg-danger"
                      style={{
                        position: "absolute",
                        top: "2px",       // légèrement en dessous du bord supérieur
                        right: "0px",     // collé au bord droit de l'icône
                        fontSize: "0.65rem",
                        padding: "0.25em 0.4em",
                      }}
                    >
                      {notifCount}
                    </span>
                  )}
                </span>
              </li>
              )}

              {/* DROPDOWN UTILISATEUR */}
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person-circle me-2" style={{ fontSize: "20px" }}></i>
                  {user.username}
                </span>

                <ul className="dropdown-menu dropdown-menu-end">
                    <li className="nav-item">
                        <span
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/profil")}
                        >
                            Profil
                        </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>

                    <li>
                        <span className="dropdown-item text-danger" style={{ cursor: "pointer" }} onClick={deco}>
                        Déconnexion
                        </span>
                    </li>
                </ul>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
