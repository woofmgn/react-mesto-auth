import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, children }) => {
  const auth = isLogged;
  return auth ? children : <Navigate to="/sign-in" />;
};

export { ProtectedRoute };
