import React from 'react';
import { List } from 'lucide-react';
import { WebsiteList } from '../components/WebsiteList';
import useWebsites from '../hooks/useWebsites';

const AllWebsites: React.FC = () => {
  const { websites, fetchWebsites } = useWebsites();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <List size={32} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">All Websites</h1>
      </div>

      <WebsiteList 
        websites={websites}
        onWebsiteDeleted={fetchWebsites}
      />
    </div>
  );
}

export default AllWebsites;
