import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
