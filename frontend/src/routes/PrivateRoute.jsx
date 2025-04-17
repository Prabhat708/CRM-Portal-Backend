import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, userData } = useContext(AuthContext);
    return isLoggedIn && userData? <Layout>{children}</Layout> : <Navigate to="/" replace />;
};

export default PrivateRoute;
