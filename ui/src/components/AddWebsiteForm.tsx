import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import useAddWebsite from '../hooks/useAddWebsite';

interface AddWebsiteFormProps {
  onWebsiteAdded: () => void;
}

export function AddWebsiteForm({ onWebsiteAdded }: AddWebsiteFormProps) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const { addWebsite, isLoading } = useAddWebsite(onWebsiteAdded);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addWebsite(name, url);
    setUrl('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Website Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={20} />
          <span>Add Website</span>
        </button>
      </div>
    </form>
  );
}
