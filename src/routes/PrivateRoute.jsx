import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/AuthContext.jsx";

export default function PrivateRoute({ allowedRoles }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // hoặc spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // Nếu có truyền roles thì check role
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/page403" replace />;
  }

  return <Outlet />;
}
