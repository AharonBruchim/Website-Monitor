import { useState, useEffect } from 'react';
import  { IWebsite }  from '../types/website'
import api from '../api/api';

const useWebsites = () => {
  const [websites, setWebsites] = useState<IWebsite[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsites = async () => {
    try {
      const response = await api.get<IWebsite[]>('/', {
      });
      setWebsites(response.data);
    } catch (err) {
      setError('Error fetching websites');
      console.error('Error fetching websites:', err);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return { websites, error, fetchWebsites };
};

export default useWebsites;