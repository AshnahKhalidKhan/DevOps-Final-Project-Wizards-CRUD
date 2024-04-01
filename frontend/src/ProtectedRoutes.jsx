import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const accessToken = localStorage.getItem("token");

  return accessToken ? <Outlet /> : <Navigate to={'/'} />;
}
