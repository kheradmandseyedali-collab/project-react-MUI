import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const loc = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: loc.pathname }} />
  );
}
