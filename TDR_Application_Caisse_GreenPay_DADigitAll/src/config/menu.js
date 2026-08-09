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
            label: "Demandes",
            path: "/requests",
        },
        {
            label: "Caisses",
            path: "/cashboxes",
        },
        {
            label: "Emprunts",
            path: "/loans",
        },
    ],

    superviseur: [
        {
            label: "Dashboard",
            path: "/dashboard",
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