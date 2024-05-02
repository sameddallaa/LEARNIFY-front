import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const PrivateRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);
  return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
