import React from "react";
import { Navigate, Outlet } from "react-router";
import { useClientContext } from "../../contexts/ClientContext";

const PrivateRoute = () => {
  console.log("PrivateRoute");
  // const { props } = useOutlet();
  // const path = props.children.props.match.pathname;
  const { isRegister } = useClientContext();
  return isRegister ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
