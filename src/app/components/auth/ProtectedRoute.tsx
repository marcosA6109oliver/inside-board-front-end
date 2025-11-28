import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

const ProtectedRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => !!state.user.data.token);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;