import { mockRequests } from '../data/mockRequests';

export default function RequestsPage() {
  return (
    <table>
      <tbody>
        {mockRequests.map((req) => (
          <tr key={req.id}>
            <td>{req.requester}</td>
            <td>{req.title}</td>
            <td>{req.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}