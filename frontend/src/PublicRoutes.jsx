import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoutes() {
  const accessToken = localStorage.getItem("token");

  return accessToken ? <Navigate to={'/wizards'} /> : <Outlet /> ;
}
