import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function RedirectIfAuthenticated() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/notes" replace />;
  }

  return <Outlet />;
}
