import RequestCard from "./RequestCard";

export default function RequestHistory({ requests }) {

    return (

        <div>

            <h2 className="text-xl font-semibold mb-4">

                Historique des demandes

            </h2>

            <div className="space-y-4">

                {requests.map(request => (

                    <RequestCard
                        key={request.id}
                        request={request}
                    />

                ))}

            </div>

        </div>

    );

}