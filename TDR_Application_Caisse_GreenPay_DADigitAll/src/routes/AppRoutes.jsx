import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

export default function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* Dashboard principal */}
                <Route
                    index
                    element={<DashboardPage />}
                />

                {/* Historique manager */}
                <Route
                    path="historique"
                    element={<DashboardPage />}
                />

            </Route>

        </Routes>
    );
}