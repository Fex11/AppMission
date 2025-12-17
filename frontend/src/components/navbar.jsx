import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {
    const navigate = useNavigate();
    const { logout,user } = useContext(AuthContext);

    const deco = () =>{
        logout();
        navigate("/login");
    }

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
