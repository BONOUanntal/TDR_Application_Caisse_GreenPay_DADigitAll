export default function DashboardHeader({ onAddRequester }) {
    return (
        <div className="flex items-start justify-between gap-4">

            <div>
                <h1 className="text-3xl font-bold">
                    Supervision financière
                </h1>

                <p className="text-gray-500 mt-1">
                    Vue consolidée · GreenPay & DA Digit All
                </p>
            </div>

            <div className="flex items-center gap-3">

                <button
                    type="button"
                    onClick={onAddRequester}
                    className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    + Ajouter un demandeur
                </button>

                <button
                    type="button"
                    className="px-5 py-3 bg-green-500 text-white rounded-lg"
                >
                    Excel
                </button>

                <button
                    type="button"
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg"
                >
                    PDF
                </button>

            </div>

        </div>
    );
}