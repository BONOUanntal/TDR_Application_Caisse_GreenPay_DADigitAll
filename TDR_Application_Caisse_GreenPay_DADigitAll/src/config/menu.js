const menus = {
  requester: [
    { label: "Dashboard", path: "/dashboard" },
  ],

  manager: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Demandes", path: "/requests" },
    { label: "Caisses", path: "/cashboxes" },
    { label: "Emprunts", path: "/loans" },
  ],

  supervisor: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Demandes", path: "/requests" },
    { label: "Rapports", path: "/reports" },
    { label: "Statistiques", path: "/statistics" },
  ],
};

export default menus;