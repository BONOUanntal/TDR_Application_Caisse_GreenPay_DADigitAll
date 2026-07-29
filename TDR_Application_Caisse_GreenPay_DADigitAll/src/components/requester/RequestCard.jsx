export default function RequestCard({ request }) {

    return (

        <div className="bg-white rounded-lg shadow p-4">

            <div className="flex justify-between">

                <div>

                    <h3 className="font-semibold">
                        {request.motif}
                    </h3>

                    <p className="text-gray-500">
                        {request.date}
                    </p>

                </div>

                <div className="text-right">

                    <p className="font-bold">
                        {request.montant} FCFA
                    </p>

                    <span>
                        {request.statut}
                    </span>

                </div>

            </div>

        </div>

    );

}