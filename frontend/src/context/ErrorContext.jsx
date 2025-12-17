// context/ErrorContext.jsx
import { createContext, useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const showError = (msg) => setError(msg);
  const clearError = () => setError(null);
  const showSuccess = (msg) => setSuccess(msg);
  const clearSuccess = () => setSuccess(null);

  return (
    <ErrorContext.Provider value={{ error, showError, clearError, showSuccess, clearSuccess, success }}>
      {children}
    </ErrorContext.Provider>
  );
};
