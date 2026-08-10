import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../../services/api";

import DashboardHeader from "../../components/Supervisor/dashboard/DashboardHeader";
import KPIGrid from "../../components/Supervisor/stats/KPIGrid";
import DashboardFilters from "../../components/Supervisor/filters/DashboardFilters";
import RequestsTable from "../../components/Supervisor/requests/RequestsTable";
import IntercashLoans from "../../components/Supervisor/loans/IntercashLoans";
import SupervisorHistory from "../../components/Supervisor/history/SupervisorHistory";


export default function SupervisorDashboard() {

    const location = useLocation();

    const isHistorique =
        location.pathname === "/dashboard/superviseur/historique";

    const [caisses, setCaisses] = useState([]);
    const [stats, setStats] = useState({});
    const [demandes, setDemandes] = useState([]);
    const [emprunts, setEmprunts] = useState([]);

    const [historique, setHistorique] = useState([]);
    const [historiquePage, setHistoriquePage] = useState(1);

    const [historiquePagination, setHistoriquePagination] =
        useState({
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        });

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

            setCaisses(
                Array.isArray(caissesRes.data)
                    ? caissesRes.data
                    : caissesRes.data?.data ?? []
            );

            setStats(
                statsRes.data ?? {}
            );

            setDemandes(
                demandesRes.data?.demandes ?? []
            );

            setEmprunts(
                Array.isArray(empruntsRes.data)
                    ? empruntsRes.data
                    : empruntsRes.data?.data ?? []
            );

            console.log("===== EMPRUNTS =====");
            console.log(empruntsRes.data);
            console.log("====================");

        } catch (error) {

            console.error(
                "Erreur lors du chargement du dashboard :",
                error
            );

        }

    }


    async function fetchHistorique(page = 1) {

        try {

            const response = await api.get(
                `/demandes/historique?page=${page}`
            );

            console.log("===== HISTORIQUE SUPERVISEUR =====");
            console.log("Réponse complète :", response.data);
            console.log("Data :", response.data?.data);
            console.log("==================================");

            setHistorique(
                response.data?.data ?? []
            );

            setHistoriquePagination({
                current_page:
                    response.data?.current_page ?? 1,

                last_page:
                    response.data?.last_page ?? 1,

                per_page:
                    response.data?.per_page ?? 10,

                total:
                    response.data?.total ?? 0,
            });

            setHistoriquePage(
                response.data?.current_page ?? 1
            );

        } catch (error) {

            console.error(
                "Erreur récupération historique superviseur :",
                error
            );

        }

    }


    useEffect(() => {

        if (isHistorique) {
            fetchHistorique();
        } else {
            fetchDashboard();
        }

    }, [isHistorique]);


    const filteredCaisses = caisses.filter((caisse) => {

        if (entreprise === "Toutes") {
            return true;
        }

        return caisse?.entreprise?.nom === entreprise;

    });


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


    // Seulement les 5 demandes affichées
    // sur le dashboard principal.
    const demandesVisibles =
        filteredDemandes.slice(0, 5);


    return (

        <div className="space-y-6">

            <DashboardHeader />


            {isHistorique ? (

                <SupervisorHistory
                    demandes={historique}
                    pagination={historiquePagination}
                    currentPage={historiquePage}
                    onPageChange={fetchHistorique}
                />

            ) : (

                <>

                    <KPIGrid
                        stats={stats}
                        caisses={filteredCaisses}
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
                                demandes={demandesVisibles}
                            />

                        </div>


                        <IntercashLoans
                            emprunts={emprunts}
                        />

                    </div>

                </>

            )}

        </div>

    );
}