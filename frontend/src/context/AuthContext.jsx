import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: null,
    roles: [],
    id:""
  });

  const [loading, setLoading] = useState(true); // nouvel état



  useEffect(() => {
    // Vérifie si un token existe au montage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const roles = localStorage.getItem("roles");
    const id = localStorage.getItem("id");
    if (token) {
      setUser({
        isLoggedIn: true,
        username,
        roles,
        id
      });
    }
    setLoading(false);
  }, []);

  const login = (token, username, roles, id ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("roles", roles);
    localStorage.setItem("id", id);
    setUser({
      isLoggedIn: true,
      username,
      roles,
      id
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    setUser({
      isLoggedIn: false,
      username: null,
      role: [],
      id:""
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
