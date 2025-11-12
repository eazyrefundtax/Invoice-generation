import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {

    const { currentUser } = useAuth();

    if (currentUser) {
        return <Outlet />
    }
    return <Navigate to={"/login"} replace />
};

export const PublicRoute = () => {

    const { currentUser } = useAuth();

    return !currentUser ? <Outlet /> : <Navigate to="/" replace />;
};