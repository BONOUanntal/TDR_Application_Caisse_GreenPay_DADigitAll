import RequestCard from "./RequestCard";

export default function RequestHistory({
    requests,
    onProofUploaded,
}) {

    return (

        <div className="space-y-4">

            {requests.map((request) => (

                <RequestCard
                    key={request.id}
                    request={request}
                    onProofUploaded={onProofUploaded}
                />

            ))}

        </div>

    );

}