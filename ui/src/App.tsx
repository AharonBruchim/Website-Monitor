import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import  Navigation  from './components/Navigation';
import  Dashboard  from './pages/Dashboard';
import AllWebsites  from './pages/AllWebsites';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/websites" element={<AllWebsites />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

