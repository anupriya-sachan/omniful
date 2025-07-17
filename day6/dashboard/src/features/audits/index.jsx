import { useDispatch, useSelector } from 'react-redux';
import { clearAuditLogs } from './auditSlice';

function AuditLogs() {
const dispatch = useDispatch();
  const logs = useSelector(state => state.audits.logs);

  function clearLogs(){
    dispatch(clearAuditLogs());
  }
  return (
    <div className="p-4 max-w-3xl mx-auto">
        <div className='flex justify-between'>
            <h1 className="text-2xl font-extrabold mb-10">Audit Logs</h1>
            <div className='px-10 h-fit w-fit py-4 bg-purple-700 text-white cursor-pointer' onClick={clearLogs}>Clear logs</div>
        </div>
      {logs.length === 0 ? (
        <p>No audit logs available.</p>
      ) : (
        <div className=''>
          {logs.map((log, index) => (
            <div key={index} className="mb-4 my-10 border py-4 px-6 rounded-md shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 cursor-pointer">
                <div className="text-gray-800">
                    <span className="font-medium text-sm text-gray-600">Action:</span> {log.actionType}
                </div>
                <div className="text-gray-500 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                </div>
            </div>
          ))}
          </div>
      )}
    </div>
  );
}

export default AuditLogs;
