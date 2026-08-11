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
    ],

    superviseur: [
        {
            label: "Dashboard",
            path: "/dashboard/superviseur",
        },
        {
            label: "Historique",
            path: "/dashboard/superviseur/historique",
        },
        {
            label: "Demandes",
            path: "/requests",
        },
        {
            label: "Rapports",
            path: "/reports",
        },
        {
            label: "Statistiques",
            path: "/statistics",
        },
    ],
};

export default menus;