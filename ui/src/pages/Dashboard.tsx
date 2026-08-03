import React from 'react';
import { Activity } from 'lucide-react';
import { AddWebsiteForm } from '../components/AddWebsiteForm';
import useWebsites from '../hooks/useWebsites';

const Dashboard: React.FC = () => {
  const { error, fetchWebsites } = useWebsites();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Activity size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <AddWebsiteForm onWebsiteAdded={fetchWebsites} />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Dashboard;
