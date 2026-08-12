import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import SupervisorDashboard from "../pages/dashboard/SupervisorDashboard";

import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import DefinePasswordPage from "../pages/DefinePasswordPage";

import CashboxesPage from "../pages/cashboxes/CashboxesPage";
import Rapport from "../components/Supervisor/rapport/Rapport";

export default function AppRoutes() {
    return (
        <Routes>

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                path="/mot-de-passe/oublie"
                element={<ForgotPasswordPage />}
            />

            <Route
                path="/definir-mot-de-passe"
                element={<DefinePasswordPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* Dashboard selon le rôle */}
                <Route
                    index
                    element={<DashboardPage />}
                />

                {/* Historique manager */}
                <Route
                    path="historique"
                    element={<DashboardPage />}
                />

                {/* Caisses (manager) */}
                <Route
                    path="caisses"
                    element={<CashboxesPage />}
                />

                {/* Dashboard superviseur */}
                <Route
                    path="superviseur"
                    element={<SupervisorDashboard />}
                />

                {/* Historique superviseur */}
                <Route
                    path="superviseur/historique"
                    element={<SupervisorDashboard />}
                />

                {/* Rapport superviseur */}
                <Route
                    path="superviseur/rapport"
                    element={<Rapport />}
                />

            </Route>

        </Routes>
    );
}