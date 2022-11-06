import React from "react";
import { Navigate, Outlet, useOutlet } from "react-router";
import { useClientContext } from "../../contexts/ClientContext";

const PrivateRoute = () => {
  const { props } = useOutlet();
  const path = props.children.props.match.pathname;
  const { isRegister } = useClientContext();
  return isRegister ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  );
};

export default PrivateRoute;
