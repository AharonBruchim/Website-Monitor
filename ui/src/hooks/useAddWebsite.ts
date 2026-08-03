import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/api';

const useAddWebsite = (onWebsiteAdded: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const addWebsite = async (name: string, url: string) => {
    setIsLoading(true);

    try {
      await api.post('/', { name, url });
      toast.success('Website added successfully');
      onWebsiteAdded();
    } catch (error) {
      toast.error('Failed to add website');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addWebsite, isLoading };
};

export default useAddWebsite;
