import { useSelector } from 'react-redux';
import { defineAbilityFor } from '../../permissions';

function AuditLogPage() {
  const logs = useSelector((state) => state.audit);
  const user = useSelector((state)=>state.auth);

  const ability = defineAbilityFor(user.role);

  return (
    <>
    {ability.can('manage','all') &&
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
        <div className="bg-white shadow rounded overflow-x-auto">
            <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-100 text-left text-sm">
                <th className="p-2">Time</th>
                <th className="p-2">Action</th>
                <th className="p-2">User</th>
                <th className="p-2">Details</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                <tr key={log.id} className="border-t text-sm">
                    <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="p-2">{log.action}</td>
                    <td className="p-2">{log.performedBy}</td>
                    <td className="p-2 whitespace-pre-wrap">
                    {JSON.stringify(log.details, null, 2)}
                    </td>
                </tr>
                ))}
                {logs.length === 0 && (
                <tr><td colSpan="4" className="p-4 text-center text-gray-500">No logs available</td></tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
        }
    </>
  );
}

export default AuditLogPage;
