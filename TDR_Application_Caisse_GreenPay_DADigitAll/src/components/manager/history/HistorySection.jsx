import { useState } from "react";
import RequestHistory from "../requests/RequestHistory";

export default function HistorySection({ demandes }) {

    const [currentPage, setCurrentPage] = useState(1);

    const demandesParPage = 10;

    const totalPages = Math.ceil(
        demandes.length / demandesParPage
    );

    const indexDepart =
        (currentPage - 1) * demandesParPage;

    const indexFin =
        indexDepart + demandesParPage;

    const demandesPageCourante =
        demandes.slice(indexDepart, indexFin);


    function changerPage(page) {

        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);
    }


    return (

        <section className="space-y-4">

            {demandes.length === 0 ? (

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">

                    <p className="text-gray-500">
                        Aucune demande dans l'historique.
                    </p>

                </div>

            ) : (

                <>

                    <RequestHistory
                        demandes={demandesPageCourante}
                    />


                    {totalPages > 1 && (

                        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">

                            <button
                                type="button"
                                onClick={() =>
                                    changerPage(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Précédent
                            </button>


                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (

                                <button
                                    type="button"
                                    key={page}
                                    onClick={() =>
                                        changerPage(page)
                                    }
                                    className={`min-w-10 px-3 py-2 rounded-lg text-sm ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white"
                                            : "border border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </button>

                            ))}


                            <button
                                type="button"
                                onClick={() =>
                                    changerPage(currentPage + 1)
                                }
                                disabled={
                                    currentPage === totalPages
                                }
                                className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Suivant
                            </button>

                        </div>

                    )}


                    {totalPages > 0 && (

                        <p className="text-center text-sm text-gray-400">
                            Page {currentPage} sur {totalPages}
                        </p>

                    )}

                </>

            )}

        </section>

    );
}