import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const NonAuthenticatedRoute = ({ Component, ...props }) => {
  const { user } = useContext(AuthContext);
  return !user ? <Component /> : <Navigate to="/home" />;
};

export default NonAuthenticatedRoute;
