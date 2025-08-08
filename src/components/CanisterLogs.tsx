import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../lib/canister';

const CanisterLogs: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLogs() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLogs();
        console.log('Fetched logs:', data);
        setLogs(data.length ? data : ['No logs received, showing test message']);
      } catch (e) {
        console.error('Error fetching logs:', e);
        setError('Failed to load logs');
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">ICP Canister Logs</h2>

      {loading && <p>Loading logs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && logs.length === 0 && <p>No logs found.</p>}

      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {logs.map((message, index) => (
          <li key={index} className="bg-white p-3 rounded-md shadow-sm border border-gray-300">
            <p className="text-gray-800">{message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CanisterLogs;
