import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RequestsPage from "../pages/RequestsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/requests"
            element={<RequestsPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}