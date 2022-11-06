import React from "react";
import { Navigate, Outlet } from "react-router";
import { useClientContext } from "../../contexts/ClientContext";

const PreventRoute = () => {
  const { isRegister } = useClientContext();

  return isRegister ? <Navigate to="/group" /> : <Outlet />;
};

export default PreventRoute;
