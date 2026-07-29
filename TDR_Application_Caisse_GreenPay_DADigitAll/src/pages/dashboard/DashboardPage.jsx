import { useAuth } from "../../context/AuthContext";

import RequesterDashboard from "./RequesterDashboard";
import ManagerDashboard from "./ManagerDashboard";
import SupervisorDashboard from "./SupervisorDashboard";

export default function DashboardPage() {

    const { auth } = useAuth();

    switch (auth.role) {

        case "requester":
            return <RequesterDashboard />;

        case "manager":
            return <ManagerDashboard />;

        case "supervisor":
            return <SupervisorDashboard />;

        default:
            return <p>Chargement...</p>;
    }

}