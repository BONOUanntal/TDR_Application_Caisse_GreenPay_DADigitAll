import { useEffect, useState } from "react";

import api from "../../services/api";

import DashboardHeader from "../../components/Supervisor/dashboard/DashboardHeader";
import KPIGrid from "../../components/Supervisor/stats/KPIGrid";
import DashboardFilters from "../../components/Supervisor/filters/DashboardFilters";
import RequestsTable from "../../components/Supervisor/requests/RequestsTable";
import IntercashLoans from "../../components/Supervisor/loans/IntercashLoans";


export default function SupervisorDashboard() {

    const [caisses, setCaisses] = useState([]);
    const [stats, setStats] = useState({});
    const [demandes, setDemandes] = useState([]);
    const [emprunts, setEmprunts] = useState([]);

    const [entreprise, setEntreprise] = useState("Toutes");
    const [periode, setPeriode] = useState("Ce mois");
    const [employe, setEmploye] = useState("Tous");

    async function fetchDashboard() {

        try {

            const [
                caissesRes,
                statsRes,
                demandesRes,
                empruntsRes,
            ] = await Promise.all([
                api.get("/caisses"),
                api.get("/rapports/tableau-de-bord"),
                api.get("/rapports"),
                api.get("/emprunts"),
            ]);

            setCaisses(caissesRes.data);
            setStats(statsRes.data);
            setDemandes(demandesRes.data);
            console.log("Demandes :", demandesRes.data);
            console.log("Caisses :", caissesRes.data);
            setEmprunts(empruntsRes.data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        fetchDashboard();

    }, []);

    const filteredDemandes = demandes.filter((demande) => {

        if (
            entreprise !== "Toutes" &&
            demande?.entreprise?.nom !== entreprise
        ) {
            return false;
        }

        if (
            employe !== "Tous" &&
            demande?.user?.name !== employe
        ) {
            return false;
        }

        return true;

    });

    return (

        <div className="space-y-6">

            <DashboardHeader />

            <KPIGrid
                stats={stats}
                caisses={caisses}
            />

            <DashboardFilters
                entreprise={entreprise}
                setEntreprise={setEntreprise}

                periode={periode}
                setPeriode={setPeriode}

                employe={employe}
                setEmploye={setEmploye}

                demandes={demandes}
                caisses={caisses}
            />

            <div className="grid grid-cols-3 gap-6">

                <div className="col-span-2">

                    <RequestsTable
                        demandes={filteredDemandes}
                    />

                </div>

                <IntercashLoans
                    emprunts={emprunts}
                />

            </div>

        </div>

    );

}