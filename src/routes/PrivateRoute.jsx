import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/AuthContext.jsx";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // hoặc spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
