const menus = {
    demandeur: [
        {
            label: "Dashboard",
            path: "/dashboard",
        },
    ],

    gestionnaire: [
        {
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            label: "Historique",
            path: "/dashboard/historique",
        },
        {
            label: "Caisses",
            path: "/dashboard/caisses",
        },
        {
            label: "Rapport",
            path: "/dashboard/rapport",
        },
        {
            label: "Emprunts intercaisses",
            path: "/dashboard/emprunts",
        },
    ],

    superviseur: [
        {
            label: "Dashboard",
            path: "/dashboard/superviseur",
        },
        {
            label: "Employés",
            path: "/dashboard/superviseur/employes",
        },
        {
            label: "Emprunts intercaisses",
            path: "/dashboard/superviseur/emprunts",
        },
        {
            label: "Historique",
            path: "/dashboard/superviseur/historique",
        },
        {
            label: "Rapport",
            path: "/dashboard/superviseur/rapport",
        },
    ],
};

export default menus;