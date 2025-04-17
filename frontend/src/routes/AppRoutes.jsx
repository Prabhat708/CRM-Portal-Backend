import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardPage from "../pages/DashboardPage";
import Leads from "../pages/leadsPage";
import Orders from "../pages/ordersPage"; 
import Customers from "../pages/customersPage";
import AddUser from "../pages/AddUser";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/AuthContext";

const AppRoutes = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, loading]);

  if (loading) return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>; // 🔹 Prevent flickering
// v0.dev
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PrivateRoute> <DashboardPage/> </PrivateRoute>} />
      <Route path="*" element={<Login />} />
      <Route path="/Leads" element={<PrivateRoute><Leads /></PrivateRoute>} />
      <Route path="/Orders" element= {<PrivateRoute><Orders/></PrivateRoute>}/>
      <Route path="/Customers" element= {<PrivateRoute><Customers/></PrivateRoute>}/>
      <Route path="/add-user" element={<PrivateRoute><AddUser /></PrivateRoute>} />


    </Routes>
  );
};

export default AppRoutes;
