import React, { useState } from 'react';
import { Trash2, CheckCircle, XCircle, Globe, Clock, Calendar, Edit2 } from 'lucide-react';
import api from '../api/api';
import { IWebsite } from '../types/website';
import toast from 'react-hot-toast';

interface WebsiteListProps {
  websites: IWebsite[];
  onWebsiteDeleted: () => void;
  onWebsiteEdited?: (website: IWebsite) => void;
}

interface EditModalProps {
  website: IWebsite;
  onClose: () => void;
  onSave: (id: string, data: { name: string, url: string }) => Promise<void>;
}

const EditModal = ({ website, onClose, onSave }: EditModalProps) => {
  const [name, setName] = useState(website.name);
  const [url, setUrl] = useState(website.url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSave(website._id, { name, url });
      onClose();
    } catch (error) {
      console.error('Error saving website:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Edit Website</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="p-4 border-t flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export function WebsiteList({ websites, onWebsiteDeleted, onWebsiteEdited }: WebsiteListProps) {
  const [editingWebsite, setEditingWebsite] = useState<IWebsite | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/${id}`);
      toast.success('Website removed');
      onWebsiteDeleted();
    } catch (error) {
      toast.error('Failed to remove website');
      console.error('Error:', error);
    }
  };

  const handleEdit = (website: IWebsite) => {
    setEditingWebsite(website);
  };

  const handleSaveEdit = async (id: string, data: { name: string, url: string }) => {
    try {
      await api.put(`/${id}`, data);
      toast.success('Website updated');
      if (onWebsiteEdited) {
        onWebsiteEdited({ ...editingWebsite!, ...data });
      } else {
        onWebsiteDeleted(); // Refetch the list if no edit handler provided
      }
    } catch (error) {
      toast.error('Failed to update website');
      console.error('Error updating website:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-4">
      {websites.length > 0 ? (
        websites.map((website) => (
          <div
            key={website._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div
              className="h-2 w-full"
              style={{
                backgroundColor: website.isAlive ? '#10B981' : '#EF4444'
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900">{website.name}</h3>
                  </div>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {website.url}
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(website)}
                    className="text-gray-400 hover:text-blue-500 transition-colors p-2 hover:bg-blue-50 rounded-full"
                    title="Edit website"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(website._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                    title="Remove website"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  {website.isAlive ? (
                    <>
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="font-medium text-green-500">Online</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500" size={20} />
                      <span className="font-medium text-red-500">Offline</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={20} />
                  <span>
                    Last checked: {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={20} />
                  <span>
                    Added: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Globe size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No websites added yet. Add your first website to start monitoring.</p>
        </div>
      )}

      {editingWebsite && (
        <EditModal
          website={editingWebsite}
          onClose={() => setEditingWebsite(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}