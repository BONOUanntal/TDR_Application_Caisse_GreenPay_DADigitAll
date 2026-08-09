export default function LoanList({
    emprunts,
    onRepay,
    loading = false,
}) {
    if (loading) {
        return (
            <p className="text-gray-500">
                Chargement des emprunts...
            </p>
        );
    }

    if (emprunts.length === 0) {
        return (
            <p className="text-gray-500">
                Aucun emprunt enregistré.
            </p>
        );
    }

    return (
        <div className="space-y-4">

            {emprunts.map((emprunt) => {

                const preteuse =
                    emprunt.caisse_preteuse ||
                    emprunt.caissePreteuse;

                const emprunteuse =
                    emprunt.caisse_emprunteuse ||
                    emprunt.caisseEmprunteuse;

                const estEnCours =
                    emprunt.statut === "en_cours" ||
                    emprunt.statut === "en cours";

                return (
                    <div
                        key={emprunt.id}
                        className="border rounded-xl p-5"
                    >

                        <div className="flex justify-between gap-6">

                            <div>

                                <h3 className="font-semibold text-lg">
                                    {preteuse?.nom}
                                    {" → "}
                                    {emprunteuse?.nom}
                                </h3>

                                <p className="text-gray-600 mt-1">
                                    {emprunt.motif}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {emprunt.date_emprunt
                                        ? new Date(
                                              emprunt.date_emprunt
                                          ).toLocaleDateString(
                                              "fr-FR"
                                          )
                                        : new Date(
                                              emprunt.created_at
                                          ).toLocaleDateString(
                                              "fr-FR"
                                          )}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold text-lg">
                                    {Number(
                                        emprunt.montant
                                    ).toLocaleString(
                                        "fr-FR"
                                    )}{" "}
                                    FCFA
                                </p>

                                <span
                                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                                        estEnCours
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                                >
                                    {estEnCours
                                        ? "En cours"
                                        : "Remboursé"}
                                </span>

                            </div>

                        </div>

                        {estEnCours && (
                            <div className="mt-4 flex justify-end">

                                <button
                                    onClick={() =>
                                        onRepay(emprunt.id)
                                    }
                                    className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg"
                                >
                                    Rembourser
                                </button>

                            </div>
                        )}

                    </div>
                );
            })}

        </div>
    );
}