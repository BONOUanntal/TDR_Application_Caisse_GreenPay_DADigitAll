import { useEffect, useState } from "react";

import DashboardHeader from "../../components/manager/dashboard/DashboardHeader";
import StatsCards from "../../components/manager/StatsCards";
import AlertSoldeInsuffisant from "../../components/manager/AlertSoldeInsuffisant";
import PendingRequests from "../../components/manager/requests/PendingRequests";
import QuickActions from "../../components/manager/actions/QuickActions";
import api from "../../services/api";

export default function ManagerDashboard() {
  const [caisses, setCaisses] = useState([]);
  const [demandes, setDemandes] = useState([]);

  async function fetchDashboard() {
        console.log("fetchDashboard appelé");

        try {

            // const [caissesRes, demandesRes] = await Promise.all([
            //     api.get("/caisses"),
            //     api.get("/demandes/en-attente"),
            // ]);

            const caissesRes = await api.get("/caisses");

            console.log(caissesRes.data);

            setCaisses(caissesRes.data);

            console.log("Réponse complète :", caissesRes);
            console.log("Data :", caissesRes.data);
            console.log("Demandes :", demandesRes.data);

            // setCaisses(caissesRes.data);
            // setDemandes(demandesRes.data);

        } catch (error) {
            console.error("Erreur API :", error);
        }
    }

  useEffect(()=>{
    fetchDashboard();
  },[]);

    return (

        <div className="space-y-6">

            <DashboardHeader />

            <StatsCards caisses={caisses} />

            <AlertSoldeInsuffisant />

            <PendingRequests demandes={demandes} />

            <QuickActions />

        </div>

    );

}