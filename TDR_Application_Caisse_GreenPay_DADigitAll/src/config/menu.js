const menus = {
  requester: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Mes demandes", path: "/requests" },
    { label: "Nouvelle demande", path: "/requests/new" },
  ],

  manager: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Demandes", path: "/requests" },
    { label: "Caisses", path: "/cashboxes" },
    { label: "Emprunts", path: "/loans" },
  ],

  supervisor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Rapports", path: "/reports" },
    { label: "Statistiques", path: "/statistics" },
  ],
};

export default menus;