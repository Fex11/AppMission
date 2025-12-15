import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    username: null,
    roles: [],
  });

  const [loading, setLoading] = useState(true); // nouvel état



  useEffect(() => {
    // Vérifie si un token existe au montage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const roles = localStorage.getItem("roles");
    if (token) {
      setUser({
        isLoggedIn: true,
        username,
        roles,
      });
    }
    setLoading(false);
  }, []);

  const login = (token, username, roles ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("roles", roles);
    setUser({
      isLoggedIn: true,
      username,
      roles,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    setUser({
      isLoggedIn: false,
      username: null,
      role: [],
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
