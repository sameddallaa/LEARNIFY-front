import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const NonAuthenticatedRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);
  return !user ? <Component /> : <Navigate to="/profile" />;
};

export default NonAuthenticatedRoute;
